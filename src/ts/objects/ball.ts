import { ColliderElement, CircleCollider } from "../collision";

export class Ball {

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