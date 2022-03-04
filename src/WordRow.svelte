<script lang="ts">
    export let word: string;
    export let wordState: string[];

    function getColor(index): string {
        console.log(wordState[index]);
        if (wordState[index] === ".") return "";
        if (wordState[index] === "G") return "correct";
        if (wordState[index] === "Y") return "correctish";
    }

    function getChar(index: number): string {
        return word[index];
    }
</script>

<main>
    <section class="row">
        {#each { length: 5 } as _, i}
            <div class={getColor(i)}>
                {getChar(i)}
            </div>
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
        background-color: lightgrey;
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
</style>
