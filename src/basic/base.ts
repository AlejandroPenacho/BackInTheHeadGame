import {ColliderElement, CircleCollider, RectangleCollider} from "./collision";




export interface Keybinding {
    left : string,
    right : string,
    jump : string,
    kick : string
}

interface CharacterProps {
    size : number;
    color : string;
    maxSpeed: number;
    jumpSpeed: number;
    side: Side;
}
interface CharacterState {
    position : number[];
    velocity: number[];
    touchingGround: boolean;
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

    state: CharacterState;
    props : CharacterProps;
    desiredVelocity: number;
    keybinding : Keybinding;
    foot : Foot;
    collisionElements : ColliderElement[];

    constructor(side : Side) {


        this.props = {
            side : side,
            color : "",
            maxSpeed : 200,
            jumpSpeed : 600,
            size : 70
        }

        if (side === Side.left){
            this.state = {
                position : standardPlayerConfig["left"].position,
                velocity : [0,0],
                touchingGround : false
            }
            this.keybinding = standardPlayerConfig["left"].keybinding;
            this.props.color = standardPlayerConfig["left"].color;
        } else {
            this.state = {
                position : standardPlayerConfig["right"].position,
                velocity : [0,0],
                touchingGround : false
            }
            this.keybinding = standardPlayerConfig["right"].keybinding;
            this.props.color = standardPlayerConfig["right"].color;
        }

            
        this.desiredVelocity = 0;

        this.foot = new Foot(side);

        this.collisionElements = [
            new CircleCollider(
                () => {return this.state.position},
                () => {return this.state.velocity},
                (deltaV) => {this.state.velocity[0] += deltaV[0]; this.state.velocity[1] += deltaV[1]},
                () => {return this.props.size/2},
                1
            ),
            new RectangleCollider(
                () => {return this.getFootPosition()},
                () => {return this.state.velocity},
                (deltaV) => {this.state.velocity[0] += deltaV[0]; this.state.velocity[1] += deltaV[1]},
                () => {return this.foot.rectLength},
                () => {return this.foot.width},
                () => {return this.getFootAngle()},
                () => {return this.foot.thetadot},
                1
            ),
            new CircleCollider(
                () => {return this.getTipCenter()},
                () => {return this.getTipVelocity()},
                (deltaV) => {this.state.velocity[0] += deltaV[0]; this.state.velocity[1] += deltaV[1]},
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

        let moveToCharacterCenter = this.state.position;
        let moveToEdge = [
            (this.props.size/2-this.foot.width/2) * Math.sin(theta*Math.PI/180),
            (this.props.size/2-this.foot.width/2) * Math.cos(theta*Math.PI/180)
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
            (tipCenter[1]-this.state.position[1]) * this.foot.thetadot + this.state.velocity[0],
            -(tipCenter[0]-this.state.position[0]) * this.foot.thetadot + this.state.velocity[1]
        ]
    }

    checkPressedKeys(currentlyPressedKeys){

        if (currentlyPressedKeys[this.keybinding.right]) {
            this.state.velocity[0] = this.props.maxSpeed;
            this.desiredVelocity = this.props.maxSpeed;
        }
        if (currentlyPressedKeys[this.keybinding.left]) {
            this.state.velocity[0] = -this.props.maxSpeed;
            this.desiredVelocity = -this.props.maxSpeed;
        }
        if (!currentlyPressedKeys[this.keybinding.right] && !currentlyPressedKeys[this.keybinding.left]){
            this.state.velocity[0] = 0;
            this.desiredVelocity = 0;
        }

        if (currentlyPressedKeys[this.keybinding.jump] && this.state.touchingGround) {
            this.state.velocity[1] = -this.props.jumpSpeed;
            this.state.touchingGround = false;
        }

        if (currentlyPressedKeys[this.keybinding.kick] && this.foot.theta < 90){
            this.foot.theta = Math.min(this.foot.theta, 90);
            if (this.props.side == Side.left){
                this.foot.thetadot = 2*Math.PI;
            } else {
                this.foot.thetadot = -2*Math.PI;
            }
        }
        if (!currentlyPressedKeys[this.keybinding.kick] && this.foot.theta > 0){
            this.foot.theta = Math.max(this.foot.theta, 0);
            if (this.props.side == Side.left){
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
        this.state.position[0] += this.state.velocity[0] * timestep;
        this.state.position[1] += this.state.velocity[1] * timestep;

        if (this.props.side == Side.left){
            this.foot.theta += this.foot.thetadot * 180/Math.PI *  timestep;
        } else {
            this.foot.theta -= this.foot.thetadot * 180/Math.PI * timestep;
        }

        this.foot.theta = Math.min(Math.max(this.foot.theta, 0), 90);
        this.state.velocity[1] += gravity * timestep;
      if (this.desiredVelocity!==this.state.velocity[0] && this.state.touchingGround){
          
        if (this.desiredVelocity === 0){
            this.state.velocity[0] *=0.6;
        } else {
            this.state.velocity[0] = this.desiredVelocity;
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