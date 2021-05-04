<script lang="ts">

    import Player from "./Player.svelte";
    import Ball from "./Ball.svelte";
    import Goal from "./Goal.svelte";
    import Keybind from "./Keybind.svelte";

    import {GameData, BallClass, Character, Side, standardPlayerConfig, GoalClass} from "./basic/base";

    let game = new GameData();

    let currentlyPressedKeys = {};


    let playerList : Character[] = [
        new Character(Side.left),
        new Character(Side.right)
    ];

    let goalList : GoalClass[] = [
        new GoalClass(game, Side.left),
        new GoalClass(game, Side.right)
    ]

    let ball = new BallClass();

    let score = [0,0];
    let recentGoal = false;

    let currentTime;
    let keyPressed;

    let activeElement: string = "scene";

    function processKeyDown(e: KeyboardEvent) {

        if (e.repeat){ 
            e.preventDefault();
            return 
        }

        keyPressed = e.key;
        if (keyPressed !== "F12" && keyPressed !== "F5" && activeElement === "scene"){
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
    function clickFunction(element) {
        return () => {activeElement = element}
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

        playerList[0].computeCharacterCollision(playerList[1]);

        playerList = playerList;

        ball.integrateTime(timestep, game.gravity);



        if (ball.position[0] > game.scenarioSize[0]-ball.size/2 && ball.velocity[0] > 0){
            ball.velocity[0] *= -1;
        }
        if (ball.position[0] < ball.size/2 && ball.velocity[0] < 0){
            ball.velocity[0] *= -1;
        }
        if (ball.position[1] > game.scenarioSize[1]-ball.size/2 && ball.velocity[1] > 0){

            if (ball.velocity[1] < 150) {
                ball.velocity[1]=0
            } else {
                ball.velocity[1] *= -0.8;
            }
            
            
            ball.position[1] = game.scenarioSize[1] - ball.size/2;
        }
        if (ball.position[1] < ball.size/2 &&
            ball.velocity[1] < 0){

            ball.velocity[1] *= -1;
        }
        
        if (ball.position[0] < (goalList[0].position[0] + goalList[0].width/2) && 
            ball.position[1] > (goalList[0].position[1]-goalList[0].height/2) &&
            !recentGoal){

            recentGoal = true;
            
            score[1] += 1;
            setTimeout(()=>{
                ball.velocity = [0, 0];
                ball.position = [400, 400];
                recentGoal = false;
            }, 500)
        }
        if (ball.position[0] > (goalList[1].position[0] - goalList[1].width/2) &&
            ball.position[1] > (goalList[1].position[1]-goalList[1].height/2) &&
            !recentGoal){

            recentGoal = true;
            score[0] += 1;
            setTimeout(()=>{
                ball.velocity = [0, 0];
                ball.position = [400, 400];
                recentGoal = false;
            }, 500)
        }

        detectCollisions();
        ball = ball;


        requestAnimationFrame(mainLoop);
    }


    function detectCollisions() {
        for (let i=0; i<game.nPlayers; i++){
            let player = playerList[i];
            player.computeBallCollision(ball);
        }
        for (let i=0; i<2; i++){
            let goal = goalList[i];
            goal.computeCircleCollision(ball);

            for (let j=0; j<game.nPlayers; j++){
                let player = playerList[j];
                goal.computeCircleCollision(player);
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

    div.control {
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 1000px;
    }
</style>

<div class="mainScene" on:click={clickFunction("scene")}>
    <Goal data={goalList[0]}/>
    <Goal data={goalList[1]}/>
    <div class="score">
        <p>{score[0]}-{score[1]}</p>
    </div>
    {#each playerList as player}
        <Player player={player} />
    {/each}
    <Ball data={ball} />
</div>

<div class="control" on:click={clickFunction("control")}>
    <Keybind defaultKey={standardPlayerConfig.left.keybinding} bind:key={playerList[0].keybinding}/>
    <Keybind defaultKey={standardPlayerConfig.right.keybinding} bind:key={playerList[1].keybinding}/>
</div>
