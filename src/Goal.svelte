<script lang="ts">
import { GoalClass, Side } from "./basic/base";


    export let data : GoalClass;

    let xTranslate : number;
    let border : string;
    let xBarTranslate: number;

    if (data.side == Side.left){
        xTranslate = 0;
        border = "0px 10px 10px 0px";
        xBarTranslate = 0;
    } else {
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
        background-color: rgb(139, 0, 0);
        position: absolute;
    }
</style>

<div class="interior" 
    style="height: {data.height}px; 
        width: {data.width}px;
        transform: translate({data.position[0]}px, {data.position[1]}px) translate(-50%, -50%)">
        
        <div class="high-bar"
             style="border-radius: {border}; 
                    transform: translate({xBarTranslate}px, 0px);
                    height: {data.barWidth}px;
                    width: {data.width+data.barWidth/2}px">

        </div>
</div>