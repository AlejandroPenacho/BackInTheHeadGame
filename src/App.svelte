<script lang="ts">

    import Player from "./svelte/Player.svelte";
    import Ball from "./svelte/Ball.svelte";
    import Goal from "./svelte/Goal.svelte";
    import {Game} from "./ts/game";
    import {Character} from "./ts/objects/character";
    import { Side } from "./ts/base";


    let game = new Game([
        new Character(Side.left),
        new Character(Side.right)
    ]);

    let currentlyPressedKeys = {};

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


    requestAnimationFrame(rAFRfunction);

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
    <Goal data={game.goalList[0]}/>
    <Goal data={game.goalList[1]}/>
    <div class="score">
        <p>{game.score[0]}-{game.score[1]}</p>
    </div>
    {#each game.characterList as player}
        <Player player={player} />
    {/each}
    <Ball ball={game.ball} />
</div>

<p>
    {game.ball.position}
</p>

<!--
<div class="control" on:click={clickFunction("control")}>
    <Keybind defaultKey={standardPlayerConfig.left.keybinding} bind:key={playerList[0].keybinding}/>
    <Keybind defaultKey={standardPlayerConfig.right.keybinding} bind:key={playerList[1].keybinding}/>
</div>
-->