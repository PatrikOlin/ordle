<script lang="ts">
    export let key: { key: string; row: number };
    export let pressed;
    export let state;

    function getColor({ _key, value }): string {
        if (value === ".") return "wrong";
        if (value === "G") return "correct";
        if (value === "Y") return "correctish";
    }
</script>

<main>
    <div class:pressed={pressed === key.key}>
        <button class="{state ? getColor(state) : ''} keyboard-key"
            >{key.key}</button
        >
    </div>
</main>

<style>
    .keyboard-key {
        font-size: 1rem;
        font-weight: 700;
        padding: 0.8rem;
        margin: 0 4px;
        cursor: pointer;
        text-transform: uppercase;
        min-width: 3rem;
    }

    .pressed button {
        background-color: lightgrey;
    }

    .correct {
        background-color: green;
    }

    .correctish {
        background-color: yellow;
    }

    .wrong {
        background-color: darkgrey;
    }
</style>
