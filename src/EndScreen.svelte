<script lang="ts">
    export let session;

    const getHeading = (status) => {
        if (status === "unsolved") return "Du förlorade!";
        if (status === "solved") return "Du vann!";
    };
</script>

<main>
    {#if session}
        <h2>{getHeading(session.status)}</h2>
        <h3>Ordet var: <span>{session.word}</span></h3>
        <p>Det tog dig {session.numberOfGuesses} gissningar.</p>
        <p>För att spela igen, tryck F5.</p>
    {/if}
</main>

<style>
</style>
