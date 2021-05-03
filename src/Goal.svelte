<script lang="ts">
    export let side;

    let xTranslate : number;
    let border : string;
    let xBarTranslate: number;

    if (side=="left"){
        xTranslate = 0;
        border = "0px 10px 10px 0px";
        xBarTranslate = 0;
    } else if (side=="right"){
        xTranslate = 1000-80;
        border = "10px 0px 0px 10px";
        xBarTranslate = -10;
    }


</script>

<style>
    div.interior {
        background-color: greenyellow;
        position: absolute;
    }
    div.high-bar {
        background-color: darkred;
        height: 20px;
        width: 90px;
        position: absolute;
    }
</style>

<div class="interior" style="height: 200px; width: 80px;
            transform: translate({xTranslate}px, 400px)">
    <div class="high-bar" style="border-radius: {border}; transform: translate({xBarTranslate}px, 0px)">

    </div>
</div>