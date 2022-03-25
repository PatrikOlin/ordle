<script lang="ts">
    import { onDestroy } from "svelte";
    import { fly } from "svelte/transition";

    import { toast } from "./shared/toastStore";

    const visibleMs = 3000;
    let visible;
    let timeout;

    const onMsgChange = (msg, ms) => {
        clearTimeout(timeout);
        if (!msg) {
            visible = false;
        } else {
            visible = true;
            if (ms > 0) timeout = setTimeout(() => (visible = false), ms);
        }
    };

    $: onMsgChange($toast, visibleMs);

    onDestroy(() => clearTimeout(timeout));
</script>

{#if visible}
    <div
        on:click={() => (visible = false)}
        transition:fly={{
            delay: 250,
            duration: 300,
            x: 0,
            y: -100,
            opacity: 0.5,
        }}
    >
        <p>{$toast}</p>
    </div>
{/if}

<style>
    div {
        position: fixed;
        cursor: pointer;
        margin-right: 1.5rem;
        margin-left: 1.5rem;
        margin-top: 0.25rem;
        right: 0;
        display: flex;
        align-items: center;
        border-radius: 0.2rem;
        background-color: #565656;
        color: var(--white);
        font-weight: 700;
        padding: 0.2rem 1.4rem;
        font-size: 1.25rem;
        z-index: 100;
        opacity: 95%;
    }
    div p {
        color: var(--white);
    }
</style>
