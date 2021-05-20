<script>

    export let startFunction;

    let endType = "time";
    let timeColor;
    let scoreColor;
    let endTypeIsTime = true;

    function selectEnd(type){
        return () => {
            endType = type; 
        };
    }

    $: {
        if (endType==="time"){
                timeColor = "green";
                scoreColor = "grey";
            } else {
                timeColor = "grey";
                scoreColor = "green";
            }
    }

</script>

<style>
    div.mainDiv{
        background-color:darkblue;
        width: 1000px;
        height: 600px;
        margin: auto;
        cursor: pointer;
        position: relative;
    }
    div.selectEndType {
        display: flex;
        justify-content: space-evenly;
        padding: 50px;
        font-size: 30px;
    }
    div.endTypeBlock {
        padding: 15px;
        border-radius: 10px;
    }
    div.endOptionsList {
        display: flex;
        justify-content: space-evenly;
        padding : 30px;
    }
    div.endOptionBlock {
        padding : 30px;
        background-color: darkgoldenrod;
    }

    div.startButton {
        padding: 20px;
        margin: auto;
        width : 120px;
        margin-top: 120px;
        font-size: 50px;
        background-color: darkorchid;
        border-radius: 20px;
    }
</style>

<div class="mainDiv">
    <div class="selectEndType">
        <div class="endTypeBlock" style="background-color: {timeColor}" on:click={selectEnd("time")}>Time</div>
        <div class="endTypeBlock" style="background-color: {scoreColor}" on:click={selectEnd("score")}>Score</div>
    </div>
    <div class="endOptionsList">
        {#if (endType==="time")}
            <div class="endOptionBlock">
                1 min
            </div>
            <div class="endOptionBlock">
                3 min
            </div>
            <div class="endOptionBlock">
                5 min
            </div>          
        {:else}
            <div class="endOptionBlock">
                5 goals
            </div>
            <div class="endOptionBlock">
                10 goals
            </div>
            <div class="endOptionBlock">
                15 goals
            </div>   
        {/if}
    </div>

    <div class="startButton" on:click={startFunction}>
        PLAY
    </div>
</div>