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

<div style="transform: translate({player.state.position[0]}px, {player.state.position[1]}px) translate(-50%, -50%);
            height: {player.props.size}px;
            width: {player.props.size}px;
            border-radius : {player.props.size/2}px;
            background-color : {player.props.color}">
    
</div>
<Foot player={player}/>