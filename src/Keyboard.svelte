<script lang="ts">
    import { keys } from "./keys";
    import KeyboardKey from "./KeyboardKey.svelte";

    export let keyDown = null;
    export let keyState;
    let pressed;

    $: if (keyDown && keyDown.toLowerCase() !== pressed) {
        pressed = keyDown.toLowerCase();
    }
</script>

<main class="keyboard">
    <div class="first row">
        {#each keys.filter((key) => key.row === 0) as key, i}
            <KeyboardKey
                {key}
                {pressed}
                state={keyState.find((ks) => ks.key === key.key)}
            />
        {/each}
    </div>
    <div class="second row">
        {#each keys.filter((key) => key.row === 1) as key, i}
            <KeyboardKey
                {key}
                {pressed}
                state={keyState.find((ks) => ks.key === key.key)}
            />
        {/each}
    </div>
    <div class="third row">
        {#each keys.filter((key) => key.row === 2) as key, i}
            <KeyboardKey
                {key}
                {pressed}
                state={keyState.find((ks) => ks.key === key.key)}
            />
        {/each}
    </div>
</main>

<style>
    .keyboard {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40rem;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .second {
        margin: 0.5rem 0;
    }
</style>
