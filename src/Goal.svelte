<script lang="ts">
    export let side;

    let xTranslate;

    if (side=="left"){
        xTranslate = 0;
    } else if (side=="right"){
        xTranslate = 1000-20;
    }


</script>

<style>
    div {
        background-color: greenyellow;
        position: absolute;
    }
</style>

<div style="height: 200px; width: 20px;
            transform: translate({xTranslate}px, 400px)">

</div>