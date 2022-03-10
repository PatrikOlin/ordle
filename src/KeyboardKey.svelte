<script lang="ts">
    export let key: { key: string; row: number };
</script>

<main>
    <div>
        <button class="keyboard-key">{key.key} </button>
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
</style>
