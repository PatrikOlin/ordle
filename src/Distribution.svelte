<script lang="ts">
    import { tweened } from "svelte/motion";

    export let key;
    export let value = 0;
    export let maxValue;

    $: value, updateProgress();

    const progress = tweened(value, {
        duration: 1000,
        delay: 0,
    });

    const updateProgress = () => {
        progress.set(value);
    };
</script>

<main class="container">
    <p>{key}</p>
    <progress value={$progress} max={maxValue} />
</main>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    p {
        margin: 0.5rem;
        margin-right: 1rem;
        font-weight: 600;
        width: 0.5rem;
    }

    progress {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        height: 1.5rem;
        width: 100%;
    }
</style>
