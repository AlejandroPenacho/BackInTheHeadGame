import { Ball } from "./objects/ball";
import { Side } from "./base";
import {Character} from "./objects/character";
import {Goal} from "./objects/goal"
import { Scene } from "./objects/scene";
import { ColliderElement, computeObjectCollision } from "./collision";


export enum ObjectiveType {
    time,
    score
}
export interface ObjectiveData {
    type: ObjectiveType,
    number: number
}

interface GameMusic {
    audio_tracks: HTMLAudioElement[],
    current_track: number
}

export class Game {
    characterList : Character[];
    goalList : Goal[];
    ball : Ball;
    scene : Scene;
    winConditions: ObjectiveData;

    collidableObjects : any[];
    dynamicObjects : any[];

    gravity : number;
    
    score : number[];
    currentTime: number;
    realTime : number;
    recentGoal : boolean;

    music: GameMusic;

    constructor(){};

    start(characterList, objective){
        this.characterList = characterList;
        this.winConditions = objective;
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

        this.music = {
            audio_tracks: [
                new Audio('../../assets/track_1.mpga'),
                new Audio('../../assets/track_2.mpga'),
                new Audio('../../assets/track_3.mpga')
            ],
            current_track: 0
        }
        this.music.audio_tracks[this.music.current_track].play();
    }
    
    update_audio(){
        let current_progress;
        if (this.winConditions.type === ObjectiveType.score){
            current_progress = Math.max(...this.score)/this.winConditions.number;
        } else {
            current_progress = this.realTime/(this.winConditions.number*60);
        }
        
        let next_track = Math.floor(current_progress*3);

        if (next_track !== this.music.current_track){
            this.music.audio_tracks[this.music.current_track].pause();
            this.music.current_track = next_track;
            this.music.audio_tracks[this.music.current_track].play();
        }
        
        if (this.music.audio_tracks[this.music.current_track].ended){
            this.music.audio_tracks[this.music.current_track].play();
        }

    }

    checkWinConditions(){

    };

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

        this.update_audio();
    }

}