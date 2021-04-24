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
    direction: number;

    constructor(side : Side) {

        if (side === Side.left){
            this.position = standardPlayerConfig["left"].position;
            this.keybinding = standardPlayerConfig["left"].keybinding;
            this.color = standardPlayerConfig["left"].color;
            this.direction = 1;
        } else {
            this.position = standardPlayerConfig["right"].position;
            this.keybinding = standardPlayerConfig["right"].keybinding;
            this.color = standardPlayerConfig["right"].color;
            this.direction = -1;
        }
        this.velocity = [0,0];
        this.touchingGround = false;
        this.size = 100;

        this.foot = new Foot(side);
    }

    setFootPosition(){

    }
}

class Foot {

    theta : number;
    alpha : number;
    length : number;
    width : number;

    position : number;
    angle : number;

    constructor(side) {
        this.theta = 0;
        this.alpha = 0;
        this.length = 100;
        this.width = 30;
    }
}