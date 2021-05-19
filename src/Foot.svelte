<script lang="ts">
    export let player;
    let positionData : number[];

    $: positionData = player.getFootPosition();
    $: angle = player.getFootAngle();
</script>

<style>
    div {
        background-color: darkgoldenrod;
        position: absolute;
        border-radius: 15px;
    }
</style>

<div style="height: {player.foot.props.width}px;
            width: {player.foot.props.length}px;
            transform: translate({positionData[0]}px, {positionData[1]}px)  translate(-50%,-50%) rotate(-{angle}deg)">
    
</div>