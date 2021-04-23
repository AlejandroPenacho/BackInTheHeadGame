<script lang="ts">
import { prevent_default } from "svelte/internal";

    import Player from "./Player.svelte";

    interface GameData {
        scenarioSize : number[],
        playerRadius : number
    }

    let gameData : GameData = {
        scenarioSize : [1000, 600],
        playerRadius : 25
    }

    let currentlyPressedKeys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    }

    let playerPosition = [0,0];
    let playerSpeed = 100;
    let currentTime;


    function processKeyDown(e: KeyboardEvent) {
        let keyPressed = e.key;
        if (keyPressed !== "F12" && keyPressed !== "F5"){
            e.preventDefault();
        }
        currentlyPressedKeys[keyPressed] = true;
        console.log(currentlyPressedKeys);
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


        if (currentlyPressedKeys["ArrowDown"]) {
            playerPosition[1] += playerSpeed * timestep;
        }
        if (currentlyPressedKeys["ArrowUp"]) {
            playerPosition[1] -= playerSpeed * timestep;
        }
        if (currentlyPressedKeys["ArrowRight"]) {
            playerPosition[0] += playerSpeed * timestep;
        }
        if (currentlyPressedKeys["ArrowLeft"]) {
            playerPosition[0] -= playerSpeed * timestep;
        }       

        requestAnimationFrame(mainLoop);
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
    <Player position={playerPosition} />
</div>


