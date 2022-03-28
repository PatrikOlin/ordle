<script lang="ts">
    import { tweened } from "svelte/motion";

    export let key;
    export let value = 0;

    $: value, updateLocalValue();

    const localValue = tweened(value, {
        duration: 1000,
        delay: 0,
    });

    const updateLocalValue = () => {
        localValue.set(value);
    };
</script>

<div class="container">
    <div class="value">
        {Math.round($localValue)}
    </div>
    <div class="key">
        {key}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 0.25rem;
        align-items: center;
        max-width: 4rem;
        margin: 1rem;
    }

    .value {
        font-size: 3rem;
        font-weight: 600;
    }
</style>
