<script lang="ts">
    export let data;
</script>

<style>
    div {
        background-color: darkgoldenrod;
        position: absolute;
        border-radius: 15px;
        transform-origin: 0px -35px;
    }
</style>

<div style="height: 30px;
            width: {data.footSize}px;
            transform:  translate({data.position[0]}px, {data.position[1] + 35}px) rotate({-data.direction*data.footAngle}deg) translate({35*(data.direction-1)}px, 0) translate(-15px, -15px)">
    
</div>