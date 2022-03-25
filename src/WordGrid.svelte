<script lang="ts">
    import WordRow from "./WordRow.svelte";
    import { sessionStore } from "./shared/sessionStore";

    export let keys: string[];
</script>

<section>
    {#if $sessionStore}
        {#each { length: 6 } as _, i}
            {#if $sessionStore.numberOfGuesses === i}
                <WordRow guess={$sessionStore.guesses[i]} {keys} />
            {:else}
                <WordRow guess={$sessionStore.guesses[i]} />
            {/if}
        {/each}
    {/if}
</section>

<style>
    section {
        margin-bottom: 4rem;
    }
</style>
