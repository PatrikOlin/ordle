<script lang="ts">
    export let session;

    const getHeading = (status) => {
        if (status === "unsolved") return "Du förlorade!";
        if (status === "solved") return "Du vann!";
    };

    const convertWordState = (wordState) => {
        let emojiState = "";
        wordState.split("").forEach((pos) => (emojiState += getEmoji(pos)));
        return emojiState;
    };

    const getEmoji = (posState) => {
        if (posState === "G") return String.fromCodePoint(0x1f7e9);
        if (posState === "Y") return String.fromCodePoint(0x1f7e8);
        if (posState === ".") return String.fromCodePoint(0x2b1b);
    };
</script>

<main>
    {#if session}
        <h2>{getHeading(session.status)}</h2>
        <h3>Ordet var: <span>{session.word}</span></h3>
        <p>Det tog dig {session.numberOfGuesses} gissningar.</p>
        <p>För att spela igen, tryck F5.</p>
        <br />
        <h3>Dela satan</h3>
        {#each session.guesses as guess}
            <span class="result">{convertWordState(guess.wordState)}</span><br />
        {/each}
    {/if}
</main>

<style>
 .result {
     letter-spacing: 2px;
 }
</style>
