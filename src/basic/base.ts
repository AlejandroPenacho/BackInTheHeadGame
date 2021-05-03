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

    constructor(){
        this.position = [400, 400];
        this.velocity = [100, -100];
        this.size = 50;
        this.dragCoefficient = 0.00003;
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
            -footAngle
    ]

    }

    computeBallCollision(ball: BallClass){
        this.computeHeadCollision(ball);
        this.computeFootCollision(ball);
    }

    computeHeadCollision(ball: BallClass){
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

    computeFootCollision(ball: BallClass){
        let [footX, footY, footAngle] = this.getFootPosition();

        footAngle = -footAngle;

        let deltaX0 = [ball.position[0] - footX, ball.position[1] - footY];

        let deltaX1 = changeBase(deltaX0, footAngle);

        let ballVelocity1 = changeBase(ball.velocity, footAngle);
        let bodyVelocity1 = changeBase(this.velocity, footAngle);

        let normal1 : number[];

        if ((deltaX1[0] <= this.foot.rectLength/2) && (deltaX1[0] >= -this.foot.rectLength/2)){

            if (deltaX1[1] <= (this.foot.width/2 + ball.size/2) && deltaX1[1] >= 0){
                normal1 = [0, 1];
            } else if (deltaX1[1] >= -(this.foot.width/2 + ball.size/2) && deltaX1[1] <= 0){
                normal1 = [0, -1];
            } else {
                return;
            }
            let footTouchPosition1 = [
                (this.size/2-this.foot.width/2)*Math.sin(this.foot.alpha) + deltaX1[0],
                (this.size/2-this.foot.width/2)*Math.cos(this.foot.alpha) + deltaX1[1]*normal1[1]
            ];

            

            let footVelocityAtPoint1 = [
                footTouchPosition1[1] * this.foot.thetadot + bodyVelocity1[0],
                -footTouchPosition1[0] * this.foot.thetadot + bodyVelocity1[1]
            ];

            let footNormalSpeed1 = footVelocityAtPoint1[1] * normal1[1];
            let ballNormalSpeed1 = ballVelocity1[1] * normal1[1];
            let collisionSpeed = footNormalSpeed1 - ballNormalSpeed1;

            if (collisionSpeed > 0){
                let ballExtraSpeed = collisionSpeed * 2;
                let normal0 = changeBase(normal1, -footAngle);
                ball.velocity[0] += ballExtraSpeed*normal0[0];
                ball.velocity[1] += ballExtraSpeed*normal0[1];
            }
            return
        }

        let circleCenterX1 : number[];
        if (Math.pow((deltaX1[0] - this.foot.rectLength/2),2) + Math.pow(deltaX1[1],2) <= Math.pow(this.foot.width/2 + ball.size/2, 2)){
            circleCenterX1 = [this.foot.rectLength/2, 0];
        } else if (Math.pow((deltaX1[0] + this.foot.rectLength/2),2) + Math.pow(deltaX1[1],2) <= Math.pow(this.foot.width/2 + ball.size/2, 2)) {
            circleCenterX1 = [-this.foot.rectLength/2, 0];
        } else {
            return
        }

        let circleCenterX0 = changeBase(circleCenterX1, -footAngle);
        circleCenterX0 = [circleCenterX0[0] + footX, circleCenterX0[1] + footY];
        deltaX0 = [ball.position[0]-circleCenterX0[0], ball.position[1]-circleCenterX0[1]];
        
        let circleVelocity0 = [
            this.foot.thetadot*(circleCenterX0[1]-this.position[1]) + this.velocity[0],
            -this.foot.thetadot* (circleCenterX0[0]-this.position[0]) + this.velocity[1]
        ]

        let distance = Math.pow(Math.pow(deltaX0[0],2) + Math.pow(deltaX0[1],2), 0.5);

        let normal0 = [deltaX0[0]/distance, deltaX0[1]/distance];

        let deltaV0 = [ball.velocity[0] - circleVelocity0[0], ball.velocity[1] - circleVelocity0[1]];

        let relativeSpeed = deltaV0[0]*normal0[0] + deltaV0[1]*normal0[1];
        
        if (relativeSpeed<0){
            ball.velocity[0] -= 2*relativeSpeed*normal0[0];
            ball.velocity[1] -= 2*relativeSpeed*normal0[1];
        }
    }

    computeCharacterCollision(other: Character){
        let deltaX : number[] = [
            other.position[0] - this.position[0],
            other.position[1] - this.position[1]
        ];
        let distance = Math.pow(Math.pow(deltaX[0],2) + Math.pow(deltaX[1],2), 0.5);

        if (distance > (this.size/2 + other.size/2)){return}

        let normalVector = [deltaX[0]/distance, deltaX[1]/distance];

        if (normalVector[1] < 0){
            other.touchingGround = true;
            setTimeout(()=>{other.touchingGround=false}, 200)
        } else if (normalVector[1] > 0){
            this.touchingGround = true;
            setTimeout(()=>{this.touchingGround=false}, 200)
        }

        let relativeVelocity = [
            other.velocity[0] - this.velocity[0],
            other.velocity[1] - this.velocity[1]
        ];
        let relativeNormalSpeed = relativeVelocity[0]*normalVector[0] + relativeVelocity[1]*normalVector[1];

        if (relativeNormalSpeed >= 0){return}

        this.velocity[0] += relativeNormalSpeed*normalVector[0];
        this.velocity[1] += relativeNormalSpeed*normalVector[1];
        other.velocity[0] -= relativeNormalSpeed*normalVector[0];
        other.velocity[1] -= relativeNormalSpeed*normalVector[1];

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
          this.velocity[0] *=0.6;
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
        this.length = 80;
        this.width = 30;
        this.rectLength = this.length - this.width;
    }
}