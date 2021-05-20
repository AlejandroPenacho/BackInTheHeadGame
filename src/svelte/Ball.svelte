<script lang="ts">
    export let ball;
    
</script>

<style>
    div {
        position: absolute;
        background-color: palevioletred;
    }
</style>

<div style="height: {ball.size}px;
            width: {ball.size}px;
            border-radius: {ball.size/2}px;
            transform: translate({ball.position[0]}px, {ball.position[1]}px) translate(-50%, -50%)">
</div>