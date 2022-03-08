<script lang="ts">
    import WordRow from "./WordRow.svelte";

    export let session: any;
    let guesses = [];
</script>

<section>
    {session}
    {#if session}
        {#each { length: 6 } as _, i}
            <WordRow word={guesses[i]} wordState={session.wordState} />
        {/each}
    {/if}
</section>

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
