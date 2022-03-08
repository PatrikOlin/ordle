<script lang="ts">
    export let word: string;
    export let wordState: string[];

    function getColor(index): string {
        console.log(wordState[index]);
        if (wordState[index] === ".") return "wrong";
        if (wordState[index] === "G") return "correct";
        if (wordState[index] === "Y") return "correctish";
    }

    function getChar(index: number): string {
        return word[index];
    }
</script>

<main>
    <section class="row">
        {word}
        {#each { length: 5 } as _, i}
            {#if word}
                <div class={getColor(i)}>
                    {getChar(i)}
                </div>
            {:else}
                <div />
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
