import { Ball } from "./objects/ball";
import { Side } from "./base";
import {Character} from "./objects/character";
import {Goal} from "./objects/goal"
import { Scene } from "./objects/scene";
import { ColliderElement, computeObjectCollision } from "./collision";

export class Game {
    characterList : Character[];
    goalList : Goal[];
    ball : Ball;
    scene : Scene;

    collidableObjects : any[];
    dynamicObjects : any[];

    gravity : number;
    
    score : number[];
    currentTime: number;
    realTime : number;
    recentGoal : boolean;

    constructor(characterList){
        this.characterList = characterList;
        this.scene = new Scene();
        this.goalList = [
            new Goal(this.scene.data, Side.left),
            new Goal(this.scene.data, Side.right)
        ];
        this.scene = new Scene();
        this.ball = new Ball();

        this.score = [0,0];
        this.gravity = 900;

        this.collidableObjects = [...this.characterList, ...this.goalList, this.ball, this.scene];
        this.dynamicObjects = [...this.characterList, this.ball];
    }

    computeNextFrame(currentTime){

        if (this.currentTime === undefined){
            this.currentTime = currentTime;
            this.realTime = 0;
        }

        let timestep = (currentTime - this.currentTime)/1000;
        this.currentTime = currentTime;
        this.realTime += timestep;


        this.dynamicObjects.forEach((element) => element.integrateTime(timestep, this.gravity));


        for (let i=0; i<(this.collidableObjects.length-1); i++){
            for (let j=i+1; j<this.collidableObjects.length; j++){
                computeObjectCollision(this.collidableObjects[i], this.collidableObjects[j]);
            }
        }

        
        if (this.ball.position[0] < (this.goalList[0].position[0] + this.goalList[0].width/2) && 
        this.ball.position[1] > (this.goalList[0].position[1]-this.goalList[0].height/2) &&
            !this.recentGoal){

                this.recentGoal = true;
            
            this.score[1] += 1;
            setTimeout(()=>{
                this.ball.velocity = [0, 0];
                this.ball.position = [this.scene.data.size[0]/2, 200];
                this.recentGoal = false;
            }, 500)
        }
        if (this.ball.position[0] > (this.goalList[1].position[0] - this.goalList[1].width/2) &&
        this.ball.position[1] > (this.goalList[1].position[1]-this.goalList[1].height/2) &&
            !this.recentGoal){

                this.recentGoal = true;
                this.score[0] += 1;
            setTimeout(()=>{
                this.ball.velocity = [0, 0];
                this.ball.position = [this.scene.data.size[0]/2, 200];
                this.recentGoal = false;
            }, 500)
        }

    }

}