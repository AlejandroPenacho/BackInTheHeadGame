
enum ColliderElementType {
    Circle,
    Rectangle,
    BoundingBox
}


export class ColliderElement {
    position : () => number[];
    velocity : () => number[];
    changeVelocity : (deltaV : number[]) => void;
    type : ColliderElementType;
    fixIndex : number;

    constructor(position    : () => number[],
                velocity    : () => number[],
                changeVelocity : (deltaV : number[]) => void,
                type        : ColliderElementType, 
                fixIndex    : number){

        this.position = position;
        this.velocity = velocity;
        this.changeVelocity = changeVelocity;
        this.type = type;
        this.fixIndex = fixIndex;
    }
}

export class CircleCollider extends ColliderElement{
    radius : () => number;

    constructor(position, velocity, changeVelocity, radius, fixIndex){

        super(position, velocity, changeVelocity, ColliderElementType.Circle, fixIndex);
        this.radius = radius;
    }
}

export class RectangleCollider extends ColliderElement {

    length : () => number;
    width : () => number;
    angle : () => number;
    angularSpeed : () => number;

    constructor(position, velocity, changeVelocity, length, width, angle, angularSpeed, fixIndex){

        super(position, velocity, changeVelocity, ColliderElementType.Rectangle, fixIndex);
        this.length = length;
        this.width = width;
        this.angle = angle;
        this.angularSpeed = angularSpeed;
    }
}

export class BoundingBoxCollider extends ColliderElement {

    angle : number;
    bounds : number[][];

    constructor(position, width, length, angle, fixIndex){
        super(position, ()=> {return [0,0]}, ()=>{}, ColliderElementType.BoundingBox, fixIndex);
        this.angle = angle;

        this.bounds = [
            [this.position[0]-length/2, this.position[0]+length/2],
            [this.position[1]-width/2, this.position[1]+width/2]
        ]
    }



}

function changeBase(coord : number[], angle : number) : number[] {
    return [
        coord[0] * Math.cos(angle * Math.PI/180) - coord[1] * Math.sin(angle*Math.PI/180),
        coord[0] * Math.sin(angle * Math.PI/180) + coord[1] * Math.cos(angle * Math.PI/180)
    ]
}

function distributeMomentum(A, B, deltaVelocity){
    if (A.fixIndex > B.fixIndex){
        A.changeVelocity([2*deltaVelocity[0], 2*deltaVelocity[1]]);
        return
    }

    if (A.fixIndex < B.fixIndex){
        B.changeVelocity([-2*deltaVelocity[0], -2*deltaVelocity[1]]);
        return 
    }
    if (A.fixIndex === B.fixIndex){
        A.changeVelocity([deltaVelocity[0], deltaVelocity[1]]);
        B.changeVelocity([-deltaVelocity[0], -deltaVelocity[1]]);
        return
    }
}


export function computeObjectCollision(A: any, B: any){
    for (let i=0; i<A.collisionElements.length; i++){
        for (let j=0; j<B.collisionElements.length; j++){
            computeElementCollision(A.collisionElements[i], B.collisionElements[j]);
        }       
    }
}


function computeElementCollision(A : ColliderElement, B : ColliderElement){

        if (A.type === ColliderElementType.Circle && B.type === ColliderElementType.Circle){
            computeCircle2CircleCollision(A as CircleCollider, B as CircleCollider);
            return;
        }

        if (A.type === ColliderElementType.Rectangle && B.type === ColliderElementType.Circle){
            computeRectangle2CircleCollision(A as RectangleCollider, B as CircleCollider);
            return;
        }

        if (A.type === ColliderElementType.Circle && B.type === ColliderElementType.Rectangle){
            computeRectangle2CircleCollision(B as RectangleCollider, A as CircleCollider);
            return;
        }

        if (A.type === ColliderElementType.BoundingBox && B.type === ColliderElementType.Circle){
            computeBoundingBox2CircleCollision(A as BoundingBoxCollider, B as CircleCollider);
            return;
        }

        if (A.type === ColliderElementType.Circle && B.type === ColliderElementType.BoundingBox){
            computeBoundingBox2CircleCollision(B as BoundingBoxCollider, A as CircleCollider);
            return;
        }
}


function computeBoundingBox2CircleCollision(A: BoundingBoxCollider, B: CircleCollider){

    if (B.position[0] <= A.bounds[0][0]){
        B.changeVelocity([-2*B.velocity[0], 0]);
        return
    }
    if (B.position[0] >= A.bounds[0][1]){
        B.changeVelocity([-2*B.velocity[0], 0]);
        return
    }
    if (B.position[1] <= A.bounds[1][0]){
        B.changeVelocity([0, -2*B.velocity[0]]);
        return
    }
    if (B.position[1] >= A.bounds[1][1]){
        B.changeVelocity([0, -2*B.velocity[0]]);
        return
    }

}

function computeCircle2CircleCollision(A : CircleCollider, B: CircleCollider){


    let deltaX = B.position()[0] - A.position()[0];
    let deltaY = B.position()[1] - A.position()[1];
    let deltaVX = B.velocity()[0] - A.velocity()[0];
    let deltaVY = B.velocity()[1] - A.velocity()[1];

    
    let distance = Math.pow(Math.pow(deltaX,2)+Math.pow(deltaY,2),0.5);

    let normalVector = [deltaX/distance, deltaY/distance];

    let relativeNormalSpeed = (deltaVX*normalVector[0] + deltaVY*normalVector[1]);

    if (distance >= (A.radius() + B.radius())){ return }

    if (relativeNormalSpeed > 0){ return }

    distributeMomentum(A, B, [relativeNormalSpeed*normalVector[0], relativeNormalSpeed*normalVector[1]])
    
}


function computeRectangle2CircleCollision(rectangle : RectangleCollider, circle : CircleCollider){

    let deltaX0 = [
        circle.position()[0] - rectangle.position()[0],
        circle.position()[1] - rectangle.position()[1]
    ]
    let rectangleAngle = rectangle.angle();

    let deltaX1 = changeBase(deltaX0, rectangleAngle);

    if ((deltaX1[0] > rectangle.length()/2) || (deltaX1[0] < -rectangle.length()/2)){
        return;
    }

    let normal1: number[];

    if ((deltaX1[1] <= (rectangle.width()/2 + circle.radius()) && (deltaX1[1] >= 0))){
        normal1 = [0, 1];
    } else if ( (deltaX1[1] >= -(rectangle.width()/2 + circle.radius())) && (deltaX1[1] <= 0)){
        normal1 = [0, -1];
    } else {
        return;
    }
    

    let rectangleVelocityAtCenter1 = changeBase(rectangle.velocity(), rectangleAngle);

    let rectangeVelocityAtTouch1 = [
        rectangleVelocityAtCenter1[0],
        rectangleVelocityAtCenter1[1] - rectangle.angularSpeed() * deltaX1[0]
    ]

    let circleVelocity1 = changeBase(circle.velocity(), rectangleAngle);

    let relativeSpeed1 = [
        circleVelocity1[0] - rectangeVelocityAtTouch1[0],
        circleVelocity1[1] - rectangeVelocityAtTouch1[1]
    ]

    let normalRelativeSpeedMag = relativeSpeed1[1] * normal1[1];


    if (normalRelativeSpeedMag >= 0) {return};

    let normal0 = changeBase(normal1, -rectangleAngle);

    let normalRelativeVelocity0 = [
        normalRelativeSpeedMag * normal0[0],
        normalRelativeSpeedMag * normal0[1]
    ]

    distributeMomentum(rectangle, circle, normalRelativeVelocity0)

}