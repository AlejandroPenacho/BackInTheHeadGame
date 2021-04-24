<script lang="ts">
    import Foot from "./Foot.svelte";

    export let player;
</script>

<style>
    div {
        position: absolute;
        border-radius: 25px;
    }
</style>

<div style="transform: translate({player.position[0]}px, {player.position[1]}px) translate(-50%, -50%);
            height: {player.size}px;
            width: {player.size}px;
            border-radius : {player.size/2}px;
            background-color : {player.color}">
    
</div>
<Foot player={player}/>