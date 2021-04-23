<script lang="ts">
import { prevent_default } from "svelte/internal";

    import Player from "./Player.svelte";
    import Ball from "./Ball.svelte";

    interface Keybinding {
        left : string,
        right : string,
        jump : string,
        kick : string
    }
    interface GameData {
        scenarioSize : number[],
        gravity : number,
        jumpSpeed : number
    }
    interface Player {
        position: number[],
        velocity: number[],
        touchingGround : boolean,
        size : number,
        color : string,
        keybinding : Keybinding
    }
    interface Ball {
        position: number[],
        velocity: number[],
        size : number
    }

    let gameData : GameData = {
        scenarioSize : [1000, 600],
        gravity : 200,
        jumpSpeed : 200
    }

    let currentlyPressedKeys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    }

    let nPlayers = 2;

    let playerList: Player[] = [
        {
            position : [800,200],
            velocity : [0,0],
            touchingGround : false,
            size : 100,
            color: "orange",
            keybinding : {
                jump : "ArrowUp",
                left : "ArrowLeft",
                right : "ArrowRight",
                kick : "k"
            }
        },
        {
            position : [100,200],
            velocity : [0,0],
            touchingGround : false,
            size : 100,
            color: "cyan",
            keybinding : {
                jump : "w",
                left : "a",
                right : "d",
                kick : "g"
            }
        }        
    ];

    let ball: Ball = {
        position: [400, 400],
        velocity: [100, -100],
        size : 60
    }

    let playerSpeed = 100;
    let currentTime;


    function processKeyDown(e: KeyboardEvent) {
        let keyPressed = e.key;
        if (keyPressed !== "F12" && keyPressed !== "F5"){
            e.preventDefault();
        }
        currentlyPressedKeys[keyPressed] = true;
    }
    function processKeyUp(e: KeyboardEvent) {
        let keyPressed = e.key;
        currentlyPressedKeys[keyPressed] = false;
    }

    document.onkeydown = processKeyDown;
    document.onkeyup = processKeyUp;

    function mainLoop(timeStamp: number) {

        if (!currentTime){
            currentTime = timeStamp;
        }

        let timestep = (timeStamp - currentTime)/1000;
        currentTime = timeStamp;

        for (let i= 0; i<nPlayers; i++){

            let player = playerList[i];

            if (currentlyPressedKeys[player.keybinding.right]) {
                player.velocity[0] = playerSpeed;
            }
            if (currentlyPressedKeys[player.keybinding.left]) {
                player.velocity[0] = -playerSpeed;
            }
            if (!currentlyPressedKeys[player.keybinding.right] && !currentlyPressedKeys[player.keybinding.left]){
                player.velocity[0] = 0;
            }

            if (currentlyPressedKeys[player.keybinding.jump] && player.touchingGround) {
                player.velocity[1] = -gameData.jumpSpeed;
                player.touchingGround = false;
            }        

            player.position[0] += player.velocity[0] * timestep;
            player.position[1] += player.velocity[1] * timestep;

            player.velocity[1] += gameData.gravity * timestep;

            if  (player.position[1] >= (gameData.scenarioSize[1] - player.size/2) &&
                (player.velocity[1] > 0)){

                    player.velocity[1] = 0;
                    player.position[1] = gameData.scenarioSize[1] - player.size/2;
                    player.touchingGround = true;
            }
        }
        playerList = playerList;


        ball.position[0] += ball.velocity[0] * timestep;
        ball.position[1] += ball.velocity[1] * timestep;

        ball.velocity[1] += gameData.gravity * timestep;

        if (ball.position[0] > gameData.scenarioSize[0]-ball.size/2 &&
            ball.velocity[0] > 0){

            ball.velocity[0] *= -1;
        }
        if (ball.position[0] < ball.size/2 &&
            ball.velocity[0] < 0){

            ball.velocity[0] *= -1;
        }
        if (ball.position[1] > gameData.scenarioSize[1]-ball.size/2 &&
            ball.velocity[1] > 0){

            ball.velocity[1] *= -1;
        }
        if (ball.position[1] < ball.size/2 &&
            ball.velocity[1] < 0){

            ball.velocity[1] *= -1;
        }        

        ball = ball;

        detectCollisions();


        requestAnimationFrame(mainLoop);
    }


    function detectCollisions() {
        for (let i=0; i<nPlayers; i++){
            let player = playerList[i];
            let deltaX = ball.position[0] - player.position[0];
            let deltaY = ball.position[1] - player.position[1];
            let deltaVX = ball.velocity[0] - player.velocity[0];
            let deltaVY = ball.velocity[1] - player.velocity[1];

            let normalVector = [deltaX, deltaY];
            let distance = Math.pow(Math.pow(deltaX,2)+Math.pow(deltaY,2),0.5);
            let collisionSpeed = Math.pow(Math.pow(deltaVX,2)+Math.pow(deltaVY,2),0.5);
            

            if (distance < (player.size/2 + ball.size/2)){
                let normalComponent = (deltaVX*normalVector[0] + deltaVY*normalVector[1])/(distance*collisionSpeed);
                if (normalComponent < 0){
                    ball.velocity[0] += 2*deltaVX*normalComponent;
                    ball.velocity[1] += 2*deltaVY*normalComponent;
                }
            }
        }
    }

    requestAnimationFrame(mainLoop);

</script>

<style>
    div {
        background-color:darkblue;
        width: 1000px;
        height: 600px;
        margin: auto;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
    }
</style>

<div>
    {#each playerList as player}
        <Player player={player} />
    {/each}
    <Ball data={ball} />
</div>


