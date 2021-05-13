import { couldStartTrivia } from "typescript";
import {ColliderElement, CircleCollider, RectangleCollider} from "./collision";

export interface Keybinding {
    left : string,
    right : string,
    jump : string,
    kick : string
}

export enum Side {
    left,
    right
}


export let standardPlayerConfig = {
    left : {
        color : "orange",
        position : [200,500],
        keybinding : {
            jump : "s",
            left : "z",
            right : "c",
            kick : "b"          
        }
    },
    right : {
        color : "cyan",
        position : [800,500],
        keybinding : {
            jump : "ArrowUp",
            left : "ArrowLeft",
            right : "ArrowRight",
            kick : "l"     
        }        
    }
}
// Check https://en.key-test.ru/ for appropiate keybindings


function changeBase(coord : number[], angle : number) : number[] {
    return [
        coord[0] * Math.cos(angle * Math.PI/180) - coord[1] * Math.sin(angle*Math.PI/180),
        coord[0] * Math.sin(angle * Math.PI/180) + coord[1] * Math.cos(angle * Math.PI/180)
    ]
}

export class GameData {
    scenarioSize : number[];
    gravity: number;
    nPlayers : number;

    constructor() {
        this.scenarioSize = [1000, 600],
        this.gravity = 900,
        this.nPlayers = 2;
    }
}

export class BallClass {

    position: number[];
    velocity: number[];
    size : number;
    dragCoefficient: number;
    collisionElements: ColliderElement[];

    constructor(){
        this.position = [500, 200];
        this.velocity = [0, 0];
        this.size = 50;
        this.dragCoefficient = 0.00003;
        this.collisionElements = [
            new CircleCollider(
                () => {return this.position},
                () => {return this.velocity},
                (deltaV) => {this.velocity[0] += deltaV[0]; this.velocity[1] += deltaV[1]},
                () => {return this.size/2},
                2
            )
        ]
    }


    integrateTime(timestep : number, gravity : number){
        this.position[0] += this.velocity[0] * timestep;
        this.position[1] += this.velocity[1] * timestep;

        this.velocity[1] += gravity * timestep;

        this.velocity[0] -= this.dragCoefficient * this.velocity[0] * Math.abs(this.velocity[0]);
        this.velocity[1] -= this.dragCoefficient * this.velocity[1] * Math.abs(this.velocity[1]);
    }
}

export class Character {
    position: number[];
    velocity: number[];
    desiredVelocity: number;
    maxSpeed: number;
    jumpSpeed: number;
    touchingGround : boolean;
    keybinding : Keybinding;
    foot : Foot;
    color : string;
    size : number;
    side: Side;
    collisionElements : ColliderElement[];

    constructor(side : Side) {

        if (side === Side.left){
            this.position = standardPlayerConfig["left"].position;
            this.keybinding = standardPlayerConfig["left"].keybinding;
            this.color = standardPlayerConfig["left"].color;
        } else {
            this.position = standardPlayerConfig["right"].position;
            this.keybinding = standardPlayerConfig["right"].keybinding;
            this.color = standardPlayerConfig["right"].color;
        }

        this.side = side;
        this.velocity = [0,0];
        this.desiredVelocity = 0;
        this.touchingGround = false;
        this.size = 70;
        this.maxSpeed = 200;
        this.jumpSpeed = 600;

        this.foot = new Foot(side);

        this.collisionElements = [
            new CircleCollider(
                () => {return this.position},
                () => {return this.velocity},
                (deltaV) => {this.velocity[0] += deltaV[0]; this.velocity[1] += deltaV[1]},
                () => {return this.size/2},
                1
            ),
            new RectangleCollider(
                () => {return this.getFootPosition()},
                () => {return this.velocity},
                (deltaV) => {this.velocity[0] += deltaV[0]; this.velocity[1] += deltaV[1]},
                () => {return this.foot.rectLength},
                () => {return this.foot.width},
                () => {return this.getFootAngle()},
                () => {return this.foot.thetadot},
                1
            ),
            new CircleCollider(
                () => {return this.getTipCenter()},
                () => {return this.getTipVelocity()},
                (deltaV) => {this.velocity[0] += deltaV[0]; this.velocity[1] += deltaV[1]},
                () => {return this.foot.width/2},
                1
            )               
        ]
    }

    getFootPosition() : number[] {

        let footAngle;
        let theta;

        footAngle = this.getFootAngle();
        theta = this.foot.theta;

        let moveToCharacterCenter = this.position;
        let moveToEdge = [
            (this.size/2-this.foot.width/2) * Math.sin(theta*Math.PI/180),
            (this.size/2-this.foot.width/2) * Math.cos(theta*Math.PI/180)
        ]

        let lastTouch = [
            (this.foot.length/2 - this.foot.width/2) * Math.cos(footAngle*Math.PI/180),
            -(this.foot.length/2 - this.foot.width/2) * Math.sin(footAngle*Math.PI/180)
        ];


        return [
            moveToCharacterCenter[0] + moveToEdge[0] + lastTouch[0],
            moveToCharacterCenter[1] + moveToEdge[1] + lastTouch[1],
        ]
    }

    getFootAngle(){
        return this.foot.theta - this.foot.alpha;
    }

    getTipCenter(){
        let footCenter = this.getFootPosition();
        let footAngle = this.getFootAngle();

        return [
            footCenter[0] + this.foot.rectLength/2 * Math.cos(footAngle*Math.PI/180),
            footCenter[1] - this.foot.rectLength/2 * Math.sin(footAngle*Math.PI/180)
        ]
    }

    getTipVelocity(){
        let tipCenter = this.getTipCenter();
        return [
            (tipCenter[1]-this.position[1]) * this.foot.thetadot + this.velocity[0],
            -(tipCenter[0]-this.position[0]) * this.foot.thetadot + this.velocity[1]
        ]
    }

    checkPressedKeys(currentlyPressedKeys){

        if (currentlyPressedKeys[this.keybinding.right]) {
            this.velocity[0] = this.maxSpeed;
            this.desiredVelocity = this.maxSpeed;
        }
        if (currentlyPressedKeys[this.keybinding.left]) {
            this.velocity[0] = -this.maxSpeed;
            this.desiredVelocity = -this.maxSpeed;
        }
        if (!currentlyPressedKeys[this.keybinding.right] && !currentlyPressedKeys[this.keybinding.left]){
            this.velocity[0] = 0;
            this.desiredVelocity = 0;
        }

        if (currentlyPressedKeys[this.keybinding.jump] && this.touchingGround) {
            this.velocity[1] = -this.jumpSpeed;
            this.touchingGround = false;
        }

        if (currentlyPressedKeys[this.keybinding.kick] && this.foot.theta < 90){
            this.foot.theta = Math.min(this.foot.theta, 90);
            if (this.side == Side.left){
                this.foot.thetadot = 2*Math.PI;
            } else {
                this.foot.thetadot = -2*Math.PI;
            }
        }
        if (!currentlyPressedKeys[this.keybinding.kick] && this.foot.theta > 0){
            this.foot.theta = Math.max(this.foot.theta, 0);
            if (this.side == Side.left){
                this.foot.thetadot = -4*Math.PI;
            } else {
                this.foot.thetadot = 4*Math.PI;
            }
        }
        if (!currentlyPressedKeys[this.keybinding.kick] && (this.foot.theta===0) || 
            (currentlyPressedKeys[this.keybinding.kick] && this.foot.theta===90)){
                this.foot.thetadot = 0;
        }
    }

    integrateTime(timestep : number, gravity : number){
        this.position[0] += this.velocity[0] * timestep;
        this.position[1] += this.velocity[1] * timestep;

        if (this.side == Side.left){
            this.foot.theta += this.foot.thetadot * 180/Math.PI *  timestep;
        } else {
            this.foot.theta -= this.foot.thetadot * 180/Math.PI * timestep;
        }

        this.foot.theta = Math.min(Math.max(this.foot.theta, 0), 90);
        this.velocity[1] += gravity * timestep;
      if (this.desiredVelocity!==this.velocity[0] && this.touchingGround){
          
        if (this.desiredVelocity === 0){
            this.velocity[0] *=0.6;
        } else {
            this.velocity[0] = this.desiredVelocity;
        }
            


      }
        
    }

}

class Foot {

    theta : number;
    thetadot : number;
    alpha : number;
    length : number;
    width : number;
    rectLength : number;

    constructor(side) {
        this.theta = 0;
        this.thetadot = 0;
        this.alpha = 0;
        this.length = 80;
        this.width = 30;
        this.rectLength = this.length - this.width;
    }
}

export class GoalClass {
    width: number;
    height: number;
    side: Side;
    barWidth: number;
    position: number[];
    collisionElements : ColliderElement[];

    constructor(game: GameData, side: Side){
        this.width = 80;
        this.height = 200;
        this.barWidth = 20;
        this.side = side;
        if (side === Side.left){
            this.position = [
                this.width/2,
                game.scenarioSize[1] - this.height/2
            ]
        } else {
            this.position = [
                game.scenarioSize[0] - this.width/2,
                game.scenarioSize[1] - this.height/2
            ]           
        }
        this.collisionElements = [
            new RectangleCollider(
                () => {return [this.position[0], this.position[1] - this.height/2 + this.barWidth/2]},
                () => {return [0,0]},
                () => {},
                () => {return this.width},
                () => {return this.barWidth},
                () => {return 0},
                () => {return 0},
                0
            ),
            new CircleCollider(
                () => {if (this.side==Side.left){
                            return [this.position[0] + this.width/2, this.position[1] - this.height/2 + this.barWidth/2]
                        } else {
                            return [this.position[0] - this.width/2, this.position[1] - this.height/2 + this.barWidth/2]
                        }},
                () => {return [0, 0]},
                () => {},
                () => {return this.barWidth/2},
                0
            )
        ]
    }
}