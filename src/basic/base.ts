import { addEmitHelper, formatDiagnosticsWithColorAndContext } from "typescript";

export interface Keybinding {
    left : string,
    right : string,
    jump : string,
    kick : string
}
export interface BallStruct {
    position: number[],
    velocity: number[],
    size : number,
    dragCoefficient: number
}

export enum Side {
    left,
    right
}


let standardPlayerConfig = {
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
    jumpSpeed : number;
    nPlayers : number;

    constructor() {
        this.scenarioSize = [1000, 600],
        this.gravity = 900,
        this.jumpSpeed = 600;
        this.nPlayers = 2;
    }
}

export class Character {
    position: number[];
    velocity: number[];
    touchingGround : boolean;
    keybinding : Keybinding;
    foot : Foot;
    color : string;
    size : number;
    side: Side;

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
        this.touchingGround = false;
        this.size = 100;

        this.foot = new Foot(side);
    }

    getFootPosition() : number[] {

        let footAngle;
        let theta;

        if (this.side === Side.left){
            footAngle = this.foot.theta - this.foot.alpha;
            theta = this.foot.theta;
        } else {
            footAngle = -this.foot.theta + this.foot.alpha + 180;
            theta = -this.foot.theta;
        }


        let firstMove = [-this.foot.length/2, -this.foot.width/2];
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
            firstMove[0] + moveToCharacterCenter[0] + moveToEdge[0] + lastTouch[0],
            firstMove[1] + moveToCharacterCenter[1] + moveToEdge[1] + lastTouch[1],
            -footAngle
    ]

    }

    computeCollision(ball: BallStruct){
        this.computeHeadCollision(ball);
        this.computeFootCollision(ball);
    }

    computeHeadCollision(ball: BallStruct){
        let deltaX = ball.position[0] - this.position[0];
        let deltaY = ball.position[1] - this.position[1];
        let deltaVX = ball.velocity[0] - this.velocity[0];
        let deltaVY = ball.velocity[1] - this.velocity[1];

        let normalVector = [deltaX, deltaY];
        let distance = Math.pow(Math.pow(deltaX,2)+Math.pow(deltaY,2),0.5);

        let collisionSpeed = (deltaVX*normalVector[0] + deltaVY*normalVector[1])/(distance);
        

        if (distance <= (this.size/2 + ball.size/2)){
            if (collisionSpeed < 0){
                ball.velocity[0] -= 2*collisionSpeed*normalVector[0]/distance;
                ball.velocity[1] -= 2*collisionSpeed*normalVector[1]/distance;
            }
        }
    }

    computeFootCollision(ball: BallStruct){
        let [footX, footY, footAngle] = this.getFootPosition();

        footAngle = -footAngle;

        let deltaX0 = [ball.position[0] - footX, ball.position[1] - footY];

        let deltaX1 = changeBase(deltaX0, footAngle);

        let ballVelocity1 = changeBase(ball.velocity, footAngle);

        let normal1 : number[];

        if (deltaX1[0] <= this.foot.rectLength && deltaX1[0] >= 0){
            if (deltaX1[1] < (this.foot.width/2 + ball.size/2) && deltaX1[1] > 0){
                normal1 = [0, 1];
            } else if (deltaX1[1] > -(this.foot.width/2 + ball.size/2) && deltaX1[1] < 0){
                normal1 = [0, -1];
            } else {
                return;
            }
            let footTouchPosition1 = [
                (this.size/2-this.foot.width/2)*Math.sin(this.foot.alpha) + deltaX1[0],
                (this.size/2-this.foot.width/2)*Math.sin(this.foot.alpha) + deltaX1[1]*normal1[1]
            ];

        let bodyVelocity1 = changeBase(this.velocity, footAngle);

        let footVelocityAtPoint1 = [
            footTouchPosition1[1] * this.foot.thetadot + bodyVelocity1[0],
            -footTouchPosition1[0] * this.foot.thetadot + bodyVelocity1[1]
        ];

        let footNormalSpeed1 = footVelocityAtPoint1[1] * normal1[1];
        let ballNormalSpeed1 = ballVelocity1[1] * normal1[1];
        let collisionSpeed = footNormalSpeed1 - ballNormalSpeed1;

        if (collisionSpeed > 0){
            let ballExtraSpeed = collisionSpeed * 2;
            let normal0 = [
                normal1[0] * Math.cos(footAngle*Math.PI/180) + normal1[1] * Math.sin(footAngle*Math.PI/180),
                -normal1[0] * Math.sin(footAngle*Math.PI/180) + normal1[1] * Math.cos(footAngle*Math.PI/180)
            ]
            ball.velocity[0] += ballExtraSpeed*normal0[0];
            ball.velocity[1] += ballExtraSpeed*normal0[1];
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
        this.alpha = 15;
        this.length = 200;
        this.width = 30;
        this.rectLength = this.length - this.width;
    }
}