<script lang="ts">
    import WordRow from "./WordRow.svelte";

    export let session: any;
    export let keys: string[];
</script>

<section>
    {#if session}
        {#each { length: 6 } as _, i}
            {#if session.numberOfGuesses === i}
                <WordRow guess={session.guesses[i]} {keys} />
            {:else}
                <WordRow guess={session.guesses[i]} />
            {/if}
        {/each}
    {/if}
</section>

<style>
    section {
        margin-bottom: 4rem;
    }
</style>
