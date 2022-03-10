<script lang="ts">
    export let guess: { word: string; wordState: string };
    export let keys: string[] = [];

    function getColor(index): string {
        console.log(guess.wordState[index]);
        if (guess.wordState[index] === ".") return "wrong";
        if (guess.wordState[index] === "G") return "correct";
        if (guess.wordState[index] === "Y") return "correctish";
    }

    function getChar(index: number): string {
        return guess.word[index];
    }

    function getKey(index: number): string {
        if (keys[index]) return keys[index];

        return "";
    }
</script>

<main>
    <section class="row">
        {#each { length: 5 } as _, i}
            {#if guess}
                <div class={getColor(i)}>
                    {getChar(i)}
                </div>
            {:else}
                <div>
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
    }
    div {
        min-width: 55px;
        height: 55px;
        background-color: transparent;
        border: 2px solid black;
        margin: 2px;
        font-size: 40px;
        text-transform: uppercase;
    }

    .correct {
        background-color: green;
    }

    .correctish {
        background-color: yellow;
    }

    .wrong {
        background-color: lightgrey;
    }
</style>
