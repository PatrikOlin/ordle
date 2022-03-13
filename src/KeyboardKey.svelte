<script lang="ts">
    export let key: { key: string; row: number };
    export let pressed;
    export let state;

    function getColor({ value }): string {
        if (value === ".") return "wrong";
        if (value === "Y") return "correctish";
        if (value === "G") return "correct";
    }
</script>

<main>
    <div class:pressed={pressed === key.key}>
        <button class="keyboard-key {state ? getColor(state) : ''} "
            >{key.key}</button
        >
    </div>
</main>

<style>
    main {
        margin: 0 4px;
    }

    .keyboard-key {
        font-size: 1rem;
        font-weight: 700;
        padding: 0.8rem;
        cursor: pointer;
        margin: 0;
        text-transform: uppercase;
        min-width: 3rem;
        border: none;
    }

    .pressed button {
        background-color: #3a3a3c;
    }
</style>
