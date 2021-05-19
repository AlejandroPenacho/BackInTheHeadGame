import {Side} from "./base";
import { ColliderElement, RectangleCollider, CircleCollider } from "./collision";
import {SceneData} from "./scene";

export class Goal {
    width: number;
    height: number;
    side: Side;
    barWidth: number;
    position: number[];
    collisionElements : ColliderElement[];

    constructor(game: SceneData, side: Side){
        this.width = 80;
        this.height = 200;
        this.barWidth = 20;
        this.side = side;
        if (side === Side.left){
            this.position = [
                this.width/2,
                game.size[1] - this.height/2
            ]
        } else {
            this.position = [
                game.size[0] - this.width/2,
                game.size[1] - this.height/2
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