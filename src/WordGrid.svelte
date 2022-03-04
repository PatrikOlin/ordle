<script lang="ts">
    import WordRow from "./WordRow.svelte";

    export let session: any;
    let guesses = [];
</script>

<main>
    {#if session}
        {#each guesses as word}
            <WordRow {word} wordState={session.wordState} />
        {/each}
    {/if}
</main>

<style>
    .row {
        display: flex;
        justify-content: center;
    }
    div {
        min-width: 55px;
        height: 55px;
        background-color: lightgrey;
        margin: 2px;
        font-size: 40px;
        text-transform: uppercase;
    }
</style>
