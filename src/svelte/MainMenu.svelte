<script lang="ts">
    import { Side } from "../ts/base";

    import { Character } from "../ts/objects/character";
    import Player from "./Player.svelte";

    export let startFunction;

    enum Objective {
        time,
        score
    }

    let possibleTimeObjectives = [1, 3, 5];
    let possibleScoreObjectives = [5, 10, 15];

    let objectiveType = Objective.time;
    let objectiveTypeColors = ["green", "grey"];

    let timeObjectiveIndex = 0;
    let scoreObjectiveIndex = 0;

    let characterList = [
        new Character(Side.left),
        new Character(Side.right)
    ]

    let characterColorIndex = [0, 1];

    characterList.forEach((character) => character.state.position = [70,70]);
    characterList = characterList;

    let colorList = ["orange", "cyan", "green", "red", "black", "yellow"];

    function selectEnd(type : Objective){
        return () => {
            objectiveType = type; 
        };
    }

    $: getObjectiveBlockColor = (objective, index) => {

        if ((objective===Objective.time) && (index === timeObjectiveIndex)){
            return "green"
        }
        if ((objective===Objective.score) && (index === scoreObjectiveIndex)){
            return "green"
        }

        return "grey"
    }

    function chooseObjectiveValue(objective, index){
        if (objective === Objective.time){
            return ()=> timeObjectiveIndex = index;
        } else {
            return ()=> scoreObjectiveIndex = index;
        }
    }

    $: {
        if (objectiveType===Objective.time){
                objectiveTypeColors = ["green", "grey"];
            } else {
                objectiveTypeColors= ["grey", "green"]
            }
    }

    function deleteCharacter(index){
        return ()=>{
            characterList.splice(index, 1);
            characterColorIndex.splice(index, 1);
            characterList = characterList;
        }
    }
    function addPlayer(){
        let newCharacter = new Character(Side.left);
        newCharacter.state.position = [70, 70];
        characterList.push(newCharacter);
        characterColorIndex.push(0);

        characterList = characterList;
    }

    function changeCharacterSide(index){
        return () => {
            let character = characterList[index];
            if (character.props.side == Side.left){
                character.props.side = Side.right;
            } else {
                character.props.side = Side.left;
            }
            characterList = characterList;
        }
    }

    function changeCharacterColor(index, change){
        return ()=> {
            characterColorIndex[index] += change;
            if (characterColorIndex[index] == colorList.length) {
                characterColorIndex[index] = 0;
            }
            if (characterColorIndex[index] < 0) {
                characterColorIndex[index] = colorList.length - 1;
            }
            characterList[index].props.color = colorList[characterColorIndex[index]];
            characterList = characterList;
        };
    }

    function clickOnStart(){
        startFunction(characterList, 0);
    }

</script>

<style>
    div.mainDiv{
        background-color:darkblue;
        width: 1000px;
        height: 600px;
        margin: auto;
        position: relative;
        display : flex;
        flex-direction: column;
    }
    div.selectEndType {
        display: flex;
        justify-content: center;
        padding-top: 50px;
        padding-bottom: 10px;
        font-size: 30px;
    }
    div.endTypeBlock {
        cursor: pointer;
        padding: 15px;
        width: 240px;
        text-align: center;
        transition: background-color 0.4s;
    }
    div.endTypeBlock#time {
        border-radius: 10px 0px 0px 10px;
    }
    div.endTypeBlock#score {
        border-radius: 0px 10px 10px 0px;
    }

    div.endOptionsList {
        display: flex;
        justify-content: center;
        padding : 10px;
    }

    div.endOptionBlock {
        cursor: pointer;
        padding : 30px;
        transition: background-color 0.4s;
    }
    div.endOptionBlock:last-child {
        border-radius: 0px 10px 10px 0px;
    }
    div.endOptionBlock:first-child {
        border-radius: 10px 0px 0px 10px;
    }

    div.lowerBlock {
        flex-grow: 1;
        display: flex;

    }
    div.characterList {
        background-color: darkred;
        flex-grow: 1;
        align-items: stretch;
        display: flex;
    }

    div.startButton {
        cursor: pointer;
        padding: 20px;
        width : 120px;
        margin: auto 10px;
        font-size: 50px;
        background-color: darkorchid;
        border-radius: 20px;
    }

    div.characterCard {
        padding: 20px;
        margin: 10px;
        margin-top: 40px;
        width: 140px;
        background-color: darksalmon;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
    }

    div.deleteCharacter {
        cursor: pointer;
        height: 20px;
        width: 20px;
        border-radius: 5px;
        background-color: red;
        margin: 0px 0px 0px auto;
        text-align: center;
    }
    div.characterPortrait {
        flex-grow: 1;
    }
    div.optionBar {
        display: flex;
        margin: 10px 0px;
    }
    div.optionBarArrowLeft {
        cursor: pointer;
        padding: 0px 5px 0px 5px;
        background-color: rgb(0, 133, 99);
        border-radius: 8px 0px 0px 8px;
    }
    div.optionBarArrowRight {
        cursor: pointer;
        padding: 0px 5px 0px 5px;
        background-color: rgb(0, 133, 99);
        border-radius: 0px 8px 8px 0px;
    }

    div.optionBarArrowRight:hover, div.optionBarArrowLeft:hover {
        background-color: rgb(59, 156, 132);
    }
    div.optionBarArrowRight:active, div.optionBarArrowLeft:active {
        background-color: rgb(123, 172, 159);
    }

    div.optionBarText {
        background-color: rgb(0, 151, 113);
        flex-grow: 1;
        text-align: center;
        cursor: default;
        -moz-user-select: none;
    }

    div.addPlayerCard {
        width: 180px;
        border-radius: 15px;
        margin: 10px;
        margin-top: 40px;
        border-style: dashed;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: greenyellow;
    }

    div.addButton {
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 50px;
        color: white;
        background-color: green;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>

<div class="mainDiv">
    <div class="selectEndType">
        <div class="endTypeBlock" id="time" style="background-color: {objectiveTypeColors[0]}" on:click={selectEnd(Objective.time)}>Time</div>
        <div class="endTypeBlock" id="score" style="background-color: {objectiveTypeColors[1]}" on:click={selectEnd(Objective.score)}>Score</div>
    </div>
    <div class="endOptionsList">
        {#if (objectiveType===Objective.time)}
            {#each [0,1,2] as index}
                <div class="endOptionBlock" 
                     style="background-color: {getObjectiveBlockColor(Objective.time, index)}"
                     on:click={chooseObjectiveValue(Objective.time, index)}>
                    {possibleTimeObjectives[index]} min
                </div>
            {/each}       
        {:else}
            {#each [0,1,2] as index}
                <div class="endOptionBlock" 
                     style="background-color: {getObjectiveBlockColor(Objective.score, index)}"
                     on:click={chooseObjectiveValue(Objective.score, index)}>
                    {possibleScoreObjectives[index]} goals
                </div>
            {/each}     
        {/if}
    </div>

    <div class="lowerBlock">
        <div class="characterList">
            {#each characterList as character, index}
            <div class="characterCard">
                <div class="deleteCharacter" on:click={deleteCharacter(index)}>
                    X
                </div>
                <div class="characterPortrait">
                    <Player player={characterList[index]}/>
                </div>
                <div class="optionBar">
                    <div class="optionBarArrowLeft" on:click={changeCharacterColor(index, -1)}>
                        &lt;
                    </div>
                    <div class="optionBarText">
                        Skin
                    </div>
                    <div class="optionBarArrowRight" on:click={changeCharacterColor(index, +1)}>
                        &gt;
                    </div>
                </div>
                <div class="optionBar">
                    <div class="optionBarArrowLeft" on:click={changeCharacterSide(index)}>
                        &lt;
                    </div>
                    <div class="optionBarText">
                        Side
                    </div>
                    <div class="optionBarArrowRight" on:click={changeCharacterSide(index)}>
                        &gt;
                    </div>
                </div>
            </div>
            {/each}
            {#if (characterList.length<4)}
            <div class="addPlayerCard">
                <div class="addButton" on:click={addPlayer}>
                    +
                </div>
            </div>
            {/if}
        </div>
        <div class="startButton" on:click={clickOnStart}>
            PLAY
        </div>
    </div>
</div>