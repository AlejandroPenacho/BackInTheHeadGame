<script lang="ts">

    import Player from "./svelte/Player.svelte";
    import Ball from "./svelte/Ball.svelte";
    import Goal from "./svelte/Goal.svelte";
    import MainMenu from "./svelte/MainMenu.svelte";
    import {Game} from "./ts/game";
    import {Character} from "./ts/objects/character";
    import { Side } from "./ts/base";
    import {ObjectiveType} from "./ts/game";

    let game = new Game();

    let currentlyPressedKeys = {};

    let playingGame = false;

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

        for (let i= 0; i<game.characterList.length; i++){
            game.characterList[i].checkPressedKeys(currentlyPressedKeys);
        }
    }
    function processKeyUp(e: KeyboardEvent) {
        let keyPressed = e.key;
        currentlyPressedKeys[keyPressed] = false;

        for (let i= 0; i<game.characterList.length; i++){
            game.characterList[i].checkPressedKeys(currentlyPressedKeys);
        }
    }
    function clickFunction(element) {
        return () => {activeElement = element}
    }

    document.onkeydown = processKeyDown;
    document.onkeyup = processKeyUp;


    function startFunction(characterList, objective){
        for (let i=0; i< characterList.length; i++){
            characterList[i].resetPosition();
        }
        game.start(characterList, objective);
        playingGame = true;
        requestAnimationFrame(rAFRfunction);
    }

    function rAFRfunction(time){
        game.computeNextFrame(time);
        game = game;
        requestAnimationFrame(rAFRfunction);
    }

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
        display: flex;
        flex-direction: column;
        margin-top: 60px;
        font-size: 80px;
        color: white;
        position: absolute;
        justify-content: center;
        align-items: center;
    }

    div.finish-container {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        color: white;
    }


    /*
    div.control {
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 1000px;
    }
    */
</style>

{#if playingGame}
<div class="mainScene" on:click={clickFunction("scene")}>
    <Goal data={game.goalList[0]}/>
    <Goal data={game.goalList[1]}/>
    {#if game.finished}
        <div class="finish-container">
            <div class="finish-message">
                {game.win_message}
            </div>
        </div>
    {:else}
        <div class="score">
            <p style="margin: 10px">{game.score[0]}-{game.score[1]}</p>
            {#if game.winConditions.type === ObjectiveType.time}
                <p style="font-size: 30px; margin: 10px">{Math.floor((game.winConditions.number*60-game.realTime)*10)/10} s</p>
            {/if}
        </div>
        {#each game.characterList as player}
            <Player player={player} />
        {/each}
        <Ball ball={game.ball} />
    {/if}
</div>

<p>
    {game.characterList[1].state.touchingGround}
</p>

{:else}
    <MainMenu startFunction={startFunction}/>
{/if}



<!--
<div class="control" on:click={clickFunction("control")}>
    <Keybind defaultKey={standardPlayerConfig.left.keybinding} bind:key={playerList[0].keybinding}/>
    <Keybind defaultKey={standardPlayerConfig.right.keybinding} bind:key={playerList[1].keybinding}/>
</div>
-->