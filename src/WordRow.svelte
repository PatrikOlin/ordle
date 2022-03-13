<script lang="ts">
    export let guess: { word: string; wordState: string };
    export let keys: string[] = [];

    function getColor(index): string {
        if (guess.wordState[index] === ".") return "wrong";
        if (guess.wordState[index] === "Y") return "correctish";
        if (guess.wordState[index] === "G") return "correct";
    }

    function getChar(index: number): string {
        return guess.word[index];
    }
</script>

<main>
    <section class="row">
        {#each { length: 5 } as _, i}
            {#if guess}
                <div class="inactive {getColor(i)}">
                    {getChar(i)}
                </div>
            {:else}
                <div class={!!keys[i] ? "hasLetter" : ""}>
                    {keys[i] ? keys[i] : ""}
                </div>
            {/if}
        {/each}
    </section>
</main>

<style>
    .row {
        display: flex;
        justify-content: center;
        color: var(--white);
        box-sizing: content-box;
    }

    .inactive {
        border: 2px solid transparent;
    }

    div {
        min-width: 55px;
        height: 55px;
        background-color: transparent;
        border: 2px solid darkgrey;
        margin: 2px;
        font-size: 40px;
        text-transform: uppercase;
        font-weight: 700;
    }

    .hasLetter {
        border: 2px solid var(--white);
    }
</style>
