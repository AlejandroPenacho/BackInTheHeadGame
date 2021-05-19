<script lang="ts">
    export let data;
    
</script>

<style>
    div {
        position: absolute;
        background-color: palevioletred;
    }
</style>

<div style="height: {data.size}px;
            width: {data.size}px;
            border-radius: {data.size/2}px;
            transform: translate({data.position[0]}px, {data.position[1]}px) translate(-50%, -50%)">
</div>