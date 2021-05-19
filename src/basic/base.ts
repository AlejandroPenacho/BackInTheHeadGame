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
interface FootProps {
    length : number,
    width : number,
    alpha : number,
    thetaLimits : number[]
}
interface FootState {
    theta : number,
    thetaDot : number
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
                () => {return this.foot.props.length - this.foot.props.width},
                () => {return this.foot.props.width},
                () => {return this.getFootAngle()},
                () => {return this.getFootAngularSpeed()},
                1
            ),
            new CircleCollider(
                () => {return this.getTipCenter()},
                () => {return this.getTipVelocity()},
                (deltaV) => {this.state.velocity[0] += deltaV[0]; this.state.velocity[1] += deltaV[1]},
                () => {return this.foot.props.width/2},
                1
            )               
        ]
    }

    getFootPosition() : number[] {

        let footAngle = this.getFootAngle();
        let theta = this.getFootTheta();

        let moveToCharacterCenter = this.state.position;
        let moveToEdge = [
            (this.props.size/2-this.foot.props.width/2) * Math.sin(theta*Math.PI/180),
            (this.props.size/2-this.foot.props.width/2) * Math.cos(theta*Math.PI/180)
        ]

        let lastTouch = [
            (this.foot.props.length/2 - this.foot.props.width/2) * Math.cos(footAngle*Math.PI/180),
            -(this.foot.props.length/2 - this.foot.props.width/2) * Math.sin(footAngle*Math.PI/180)
        ];


        return [
            moveToCharacterCenter[0] + moveToEdge[0] + lastTouch[0],
            moveToCharacterCenter[1] + moveToEdge[1] + lastTouch[1],
        ]
    }

    getFootAngle(){
        if (this.props.side == Side.left){
            return this.foot.state.theta - this.foot.props.alpha;
        } else {
            return 180 - this.foot.state.theta + this.foot.props.alpha
        }
    }
    getFootAngularSpeed(){
        if (this.props.side == Side.left){
            return this.foot.state.thetaDot
        } else {
            return -this.foot.state.thetaDot
        }
    }

    getFootTheta(){
        if (this.props.side == Side.left){
            return this.foot.state.theta
        } else {
            return -this.foot.state.theta
        }
    }

    getTipCenter(){
        let footCenter = this.getFootPosition();
        let footAngle = this.getFootAngle();
        let rectLength = this.foot.props.length - this.foot.props.width;

        return [
            footCenter[0] + rectLength/2 * Math.cos(footAngle*Math.PI/180),
            footCenter[1] - rectLength/2 * Math.sin(footAngle*Math.PI/180)
        ]
    }

    getTipVelocity(){
        let tipCenter = this.getTipCenter();
        return [
            (tipCenter[1]-this.state.position[1]) * this.getFootAngularSpeed() + this.state.velocity[0],
            -(tipCenter[0]-this.state.position[0]) * this.getFootAngularSpeed() + this.state.velocity[1]
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

        if (currentlyPressedKeys[this.keybinding.kick] && this.foot.state.theta < this.foot.props.thetaLimits[1]){
            this.foot.state.theta = Math.min(this.foot.state.theta, this.foot.props.thetaLimits[1]);

            this.foot.state.thetaDot = 2*Math.PI;

        }
        if (!currentlyPressedKeys[this.keybinding.kick] && this.foot.state.theta > this.foot.props.thetaLimits[0]){
            this.foot.state.theta = Math.max(this.foot.state.theta, this.foot.props.thetaLimits[0]);
            
            this.foot.state.thetaDot = -4*Math.PI;

        }
        if (!currentlyPressedKeys[this.keybinding.kick] && (this.foot.state.theta===this.foot.props.thetaLimits[0]) || 
            (currentlyPressedKeys[this.keybinding.kick] && this.foot.state.theta===this.foot.props.thetaLimits[1])){
                this.foot.state.thetaDot = 0;
        }
    }

    integrateTime(timestep : number, gravity : number){
        this.state.position[0] += this.state.velocity[0] * timestep;
        this.state.position[1] += this.state.velocity[1] * timestep;


        this.foot.state.theta += this.foot.state.thetaDot * 180/Math.PI *  timestep;

        this.foot.state.theta = Math.min(Math.max(this.foot.state.theta, this.foot.props.thetaLimits[0]), this.foot.props.thetaLimits[1]);

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

    state : FootState;
    props : FootProps;

    constructor(side) {
        
        if (side === Side.left){
            var alpha = 0;
            var thetaLimits = [0, 90];
        } else {
            var alpha = 90;
            var thetaLimits = [90, 150];
        }
        
        this.props = {
            length : 80,
            width : 30,
            alpha : alpha,
            thetaLimits : thetaLimits
        }

        this.state = {
            theta : thetaLimits[0],
            thetaDot : 0
        }

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