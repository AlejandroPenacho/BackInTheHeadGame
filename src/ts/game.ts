import { Side } from "./base";
import {Character} from "./character";
import {Goal} from "./goal"
import { Scene } from "./scene";

export class Game {
    characterList : Character[];
    goalList : Goal[];
    scene : Scene;
    mainData

    constructor(characterList){
        this.characterList = characterList;
        this.scene = new Scene();
        this.goalList = [
            new Goal(this.scene.data, Side.left),
            new Goal(this.scene.data, Side.right)
        ];
        this.scene = new Scene();
    }
}