<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let key: { key: string; displayKey: string; row: number };
    export let state;

    let status = "";

    const dispatch = createEventDispatcher();

    function setStatus({ value }): string {
        if (value === "G") return (status = "correct");
        if (status) return status;
        if (value === "Y") return (status = "correctish");
        if (value === ".") return (status = "wrong");
    }

    const handleClick = () => {
        dispatch("keyClick", key.key);
    };
</script>

<main on:click={handleClick}>
    <div>
        <button class="keyboardKey {state ? setStatus(state) : status} "
            >{key.displayKey}</button
        >
    </div>
</main>

<style>
    main {
        margin: 0 4px;
    }

    .keyboardKey {
        font-size: 1rem;
        font-weight: 500;
        padding: 0.8rem;
        cursor: pointer;
        margin: auto;
        text-transform: uppercase;
        min-width: 3rem;
        border: none;
        transition: all 0.2ms ease-out;
    }

    @media only screen and (max-width: 600px) {
        .keyboardKey {
            font-size: 0.75rem;
            padding: 1rem 0.4rem;
            min-width: 1.6rem;
        }
        main {
            margin: 0 3px;
        }
    }

    /* .pressed button {
    background-color: #3a3a3c;
    } */
</style>
