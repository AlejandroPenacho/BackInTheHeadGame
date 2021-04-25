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
}

class Foot {

    theta : number;
    alpha : number;
    length : number;
    width : number;

    constructor(side) {
        this.theta = 0;
        this.alpha = 0;
        this.length = 100;
        this.width = 30;
    }
}