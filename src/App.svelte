<script lang="ts">
import { prevent_default } from "svelte/internal";

    import Player from "./Player.svelte";

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
            position : [0,200],
            velocity : [0,0],
            touchingGround : false,
            size : 50,
            color: "orange",
            keybinding : {
                jump : "ArrowUp",
                left : "ArrowLeft",
                right : "ArrowRight",
                kick : "k"
            }
        },
        {
            position : [800,200],
            velocity : [0,0],
            touchingGround : false,
            size : 50,
            color: "cyan",
            keybinding : {
                jump : "w",
                left : "a",
                right : "d",
                kick : "g"
            }
        }        
    ];

    let playerSpeed = 100;
    let currentTime;


    function processKeyDown(e: KeyboardEvent) {
        let keyPressed = e.key;
        if (keyPressed !== "F12" && keyPressed !== "F5"){
            e.preventDefault();
        }
        currentlyPressedKeys[keyPressed] = true;
        console.log(playerList);
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
    {#each playerList as player}
        <Player player={player} />
    {/each}
</div>


