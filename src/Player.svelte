<script lang="ts">
    export let position : number[];
</script>

<style>
    div {
        background-color: orange;
        width: 50px;
        height: 50px;
        position: absolute;
        border-radius: 25px;
    }
</style>

<div style="transform: translate({position[0]}px, {position[1]}px) translate(-50%, -50%)">
    
</div>