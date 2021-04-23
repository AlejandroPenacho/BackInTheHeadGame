<script lang="ts">
    export let data;
</script>

<style>
    div {
        height: 60px;
        width: 60px;
        position: absolute;
        border-radius: 30px;
        background-color: palevioletred;
    }
</style>

<div style="height: {data.size};
            width: {data.size};
            border-radius: {data.size/2};
            transform: translate({data.position[0]}px, {data.position[1]}px) translate(-50%, -50%)">

</div>