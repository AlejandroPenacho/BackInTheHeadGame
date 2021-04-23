<script lang="ts">
    import Player from "./Player.svelte";

    let nClicks : number = 0;

</script>

<style>
    div {
        background-color: green;
        -moz-user-select: none;
        cursor: pointer;
    }
</style>

<div on:click={()=> nClicks+=1}>
    Click here {nClicks} times so far
</div>
<Player number={nClicks*2}/>