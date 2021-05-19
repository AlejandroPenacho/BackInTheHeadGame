<script lang="ts">

    export let defaultKey;

    export let key = {
        left: defaultKey.left,
        right: defaultKey.right,
        jump: defaultKey.jump,
        kick: defaultKey.kick
    };

</script>

<style>
    div.main {
        background-color: khaki;
        padding: 20px;
    }
    div.container {
        display: flex;
        flex-direction: column;
    }
    div.row {
        display: flex;
        justify-content: space-between;
    }

    input {
        width: 80px;
    }

    p {
        padding-top: 9px;
        padding-bottom: 9px;
        margin: 0px;
    }
</style>

<div class="main">
    <h5> Keys </h5>
    <div class="container">
        <div class="row">
            <p>Left: </p><input bind:value={key.left}>
        </div>
        <div class="row">
            <p>Right: </p><input bind:value={key.right}>
        </div>
        <div class="row">
            <p>Jump: </p><input bind:value={key.jump}>
        </div>
        <div class="row">
            <p>Kick: </p><input bind:value={key.kick}>
        </div>
    </div>   
</div>