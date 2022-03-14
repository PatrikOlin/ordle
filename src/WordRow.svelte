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
                    <span class="letter">{getChar(i)}</span>
                </div>
            {:else}
                <div class={!!keys[i] ? "hasLetter" : ""}>
                    <span>{keys[i] ? keys[i] : ""}</span>
                </div>
            {/if}
        {/each}
    </section>
</main>

<style>
    div {
        min-width: 55px;
        height: 55px;
        line-height: 55px;
        background-color: transparent;
        border: 2px solid darkgrey;
        margin: 2px;
        font-size: 35px;
        text-transform: uppercase;
        font-weight: 700;
    }

    .row {
        display: flex;
        justify-content: center;
        color: var(--white);
        box-sizing: content-box;
    }

    .inactive {
        border: 2px solid transparent;
    }

    .letter {
        align-self: center;
    }

    .hasLetter {
        border: 2px solid var(--white);
    }
</style>
