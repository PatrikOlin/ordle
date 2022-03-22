<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let key: { key: string; row: number };
    export let pressed;
    export let state;

    const dispatch = createEventDispatcher();

    function getColor({ value }): string {
        if (value === ".") return "wrong";
        if (value === "Y") return "correctish";
        if (value === "G") return "correct";
    }

    const handleClick = () => {
        dispatch("keyClick", key.key);
    };
</script>

<main on:click|once={handleClick}>
    <div class:pressed={pressed === key.key}>
        <button class="keyboardKey {state ? getColor(state) : ''} "
            >{key.key}</button
        >
    </div>
</main>

<style>
    main {
        margin: 0 4px;
    }

    .keyboardKey {
        font-size: 1rem;
        font-weight: 700;
        padding: 0.8rem;
        cursor: pointer;
        margin: auto;
        text-transform: uppercase;
        min-width: 3rem;
        border: none;
    }

    @media only screen and (max-width: 600px) {
        .keyboardKey {
            font-size: 0.75rem;
            padding: 1rem 0.4rem;
            min-width: 1.5rem;
        }
    }

    .pressed button {
        background-color: #3a3a3c;
    }
</style>
