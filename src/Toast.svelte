<script lang="ts">
    import { onDestroy } from "svelte";
    import { fly } from "svelte/transition";

    import { toast } from "./shared/toastStore";

    const visibleMs = 3000;
    let visible = false;
    let timeout;

    const onMsgChange = (msg, ms) => {
        clearTimeout(timeout);
        if (!msg) {
            visible = false;
        } else {
            visible = true;
            if (ms > 0)
                timeout = setTimeout(() => {
                    visible = false;
                    $toast = "";
                }, ms);
        }
    };

    $: onMsgChange($toast, visibleMs);

    onDestroy(() => clearTimeout(timeout));
</script>

{#if visible}
    <div
        on:click={() => (visible = false)}
        transition:fly={{
            delay: 150,
            duration: 300,
            x: 0,
            y: -200,
            opacity: 0.5,
        }}
    >
        <p>{$toast}</p>
    </div>
{/if}

<style>
    div {
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        cursor: pointer;
        margin: auto;
        margin-top: 2.75rem;
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
        margin: 0.75rem auto;
        color: var(--white);
    }
</style>
