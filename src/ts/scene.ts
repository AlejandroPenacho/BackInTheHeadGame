import { BoundingBoxCollider, ColliderElement } from "./collision";

export interface SceneData {
    size : number[];
}

export class Scene {
    data : SceneData;
    collisionElements : ColliderElement[];

    constructor(){
        this.data = {
            size : [1000, 600],
        };
        this.collisionElements = [
            new BoundingBoxCollider(
                [this.data.size[0]/2, this.data.size[1]/2],
                this.data.size[1],
                this.data.size[0],
                0,
                0
            )
        ]
    }
}