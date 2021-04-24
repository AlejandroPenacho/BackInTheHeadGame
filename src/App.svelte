<script lang="ts">

    import Player from "./Player.svelte";
    import Ball from "./Ball.svelte";
    import type {BallStruct} from "./basic/base";
    import {GameData, Character, Side} from "./basic/base";

    let game = new GameData();

    let currentlyPressedKeys = {};


    let playerList : Character[] = [
        new Character(Side.left),
        new Character(Side.right)
    ];

    let ball: BallStruct = {
        position: [400, 400],
        velocity: [100, -100],
        size : 60,
        dragCoefficient : 0.001
    }

    let score = [0,0];

    let playerSpeed = 200;
    let currentTime;

    let keyPressed;

    function processKeyDown(e: KeyboardEvent) {
        keyPressed = e.key;
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

        for (let i= 0; i<game.nPlayers; i++){

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
                player.velocity[1] = -game.jumpSpeed;
                player.touchingGround = false;
            }

            if (currentlyPressedKeys[player.keybinding.kick] && player.foot.theta < 90){
                player.foot.theta += 360*timestep;
            }
            if (!currentlyPressedKeys[player.keybinding.kick] && player.foot.theta > 0){
                player.foot.theta-= 720*timestep;
                player.foot.theta = Math.max(player.foot.theta, 0);
            }


            player.position[0] += player.velocity[0] * timestep;
            player.position[1] += player.velocity[1] * timestep;

            player.velocity[1] += game.gravity * timestep;

            if  (player.position[1] >= (game.scenarioSize[1] - player.size/2) &&
                (player.velocity[1] > 0)){

                    player.velocity[1] = 0;
                    player.position[1] = game.scenarioSize[1] - player.size/2;
                    player.touchingGround = true;
            }
        }
        playerList = playerList;


        ball.position[0] += ball.velocity[0] * timestep;
        ball.position[1] += ball.velocity[1] * timestep;

        ball.velocity[1] += game.gravity * timestep;

        ball.velocity[0] *= (1- ball.dragCoefficient);
        ball.velocity[0] *= (1- ball.dragCoefficient);

        if (ball.position[0] > game.scenarioSize[0]-ball.size/2 &&
            ball.velocity[0] > 0){

                if (ball.position[1] > 400){
                    score = [score[0]+1 , score[1]];
                }

            ball.velocity[0] *= -1;
        }
        if (ball.position[0] < ball.size/2 &&
            ball.velocity[0] < 0){

                if (ball.position[1] > 400){
                    score = [score[0], score[1] +1];
                }

            ball.velocity[0] *= -1;
        }
        if (ball.position[1] > game.scenarioSize[1]-ball.size/2 &&
            ball.velocity[1] > 0){

            ball.velocity[1] *= -1;
        }
        if (ball.position[1] < ball.size/2 &&
            ball.velocity[1] < 0){

            ball.velocity[1] *= -1;
        }        


        detectCollisions();
        ball = ball;


        requestAnimationFrame(mainLoop);
    }


    function detectCollisions() {
        for (let i=0; i<game.nPlayers; i++){
            let player = playerList[i];
            let deltaX = ball.position[0] - player.position[0];
            let deltaY = ball.position[1] - player.position[1];
            let deltaVX = ball.velocity[0] - player.velocity[0];
            let deltaVY = ball.velocity[1] - player.velocity[1];

            let normalVector = [deltaX, deltaY];
            let distance = Math.pow(Math.pow(deltaX,2)+Math.pow(deltaY,2),0.5);
            let deltaSpeed = Math.pow(Math.pow(deltaVX,2)+Math.pow(deltaVY,2),0.5);

            let collisionSpeed = (deltaVX*normalVector[0] + deltaVY*normalVector[1])/(distance);
            

            if (distance <= (player.size/2 + ball.size/2)){
                if (collisionSpeed < 0){
                    ball.velocity[0] -= 2*collisionSpeed*normalVector[0]/distance;
                    ball.velocity[1] -= 2*collisionSpeed*normalVector[1]/distance;
                }
            }
        }
    }

    ball = ball;

    requestAnimationFrame(mainLoop);

</script>

<style>
    div.mainScene{
        background-color:darkblue;
        width: 1000px;
        height: 600px;
        margin: auto;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        position: relative;
    }

    div.score {
        width: 100%;
        margin: auto;
        display: flex;
        font-size: 80px;
        color: white;
        position: absolute;
        justify-content: center;
    }
</style>

<div class="mainScene">
    <div class="score">
        <p>{score[0]}-{score[1]}</p>
    </div>
    {#each playerList as player}
        <Player player={player} />
    {/each}
    <Ball data={ball} />
</div>


