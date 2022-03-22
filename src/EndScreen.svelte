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

    function getEmojiState() {
        let state = "Ordle \n\n";
        session.guesses.forEach((guess) => {
            state += convertWordState(guess.wordState) + "\n";
        });

        return state;
    }

    function insertToClipboard() {
        const state = getEmojiState();
        navigator.clipboard.writeText(state).then(
            () => {
                console.log("copied to clipboard");
            },
            () => {
                console.log(
                    "could not copy to clipboard, get a better browser"
                );
            }
        );
    }
</script>

<main>
    {#if session}
        <h2>{getHeading(session.status)}</h2>
        <h3>Ordet var: <span>{session.word}</span></h3>
        <p>Det tog dig {session.numberOfGuesses} gissningar.</p>
        <p>För att spela igen, tryck F5.</p>
        <br />
        <button on:click={insertToClipboard}> Dela satan </button>
    {/if}
</main>
