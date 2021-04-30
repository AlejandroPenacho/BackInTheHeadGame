<script lang="ts">

    import Player from "./Player.svelte";
    import Ball from "./Ball.svelte";
    import Goal from "./Goal.svelte";
    import {GameData, BallClass, Character, Side} from "./basic/base";

    let game = new GameData();

    let currentlyPressedKeys = {};


    let playerList : Character[] = [
        new Character(Side.left),
        new Character(Side.right)
    ];

    let ball = new BallClass();

    let score = [0,0];

    let currentTime;

    let keyPressed;

    function processKeyDown(e: KeyboardEvent) {

        if (e.repeat){ return }

        keyPressed = e.key;
        if (keyPressed !== "F12" && keyPressed !== "F5"){
            e.preventDefault();
        }
        currentlyPressedKeys[keyPressed] = true;

        for (let i= 0; i<game.nPlayers; i++){
            playerList[i].checkPressedKeys(currentlyPressedKeys);
        }
    }
    function processKeyUp(e: KeyboardEvent) {
        let keyPressed = e.key;
        currentlyPressedKeys[keyPressed] = false;

        for (let i= 0; i<game.nPlayers; i++){
            playerList[i].checkPressedKeys(currentlyPressedKeys);
        }
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

            player.integrateTime(timestep, game.gravity);
            
            player.position[0] = Math.min(Math.max(player.position[0], player.size/2), game.scenarioSize[0] - player.size/2);

            if  (player.position[1] >= (game.scenarioSize[1] - player.size/2) &&
                (player.velocity[1] > 0)){

                    player.velocity[1] = 0;
                    player.position[1] = game.scenarioSize[1] - player.size/2;
                    player.touchingGround = true;
            }
        }

        playerList = playerList;

        ball.integrateTime(timestep, game.gravity);



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

            ball.velocity[1] *= -0.8;
            ball.position[1] = game.scenarioSize[1] - ball.size/2;
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
            player.computeCollision(ball);
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

    div.control {
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 1000px;
    }
    div.controlBlock {
        background-color: khaki;
        padding: 20px;
    }
</style>

<div class="mainScene">
    <Goal side="right"/>
    <Goal side="left"/>
    <div class="score">
        <p>{score[0]}-{score[1]}</p>
    </div>
    {#each playerList as player}
        <Player player={player} />
    {/each}
    <Ball data={ball} />
</div>

<div class="control">
    <div class="controlBlock">
        <h5> Left player</h5>
        <p>Left : Z</p>
        <p>Right: C</p>
        <p>Jump: S</p>
        <p>Kick: B</p>
    </div>
    <div class="controlBlock">
        <h5> Right player</h5>
        <p>Left : left arrow</p>
        <p>Right: right arrow</p>
        <p>Jump: up arrow</p>
        <p>Kick: L</p>
    </div>
</div>
