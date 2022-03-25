<script lang="ts">
    import { sessionStore } from "./shared/sessionStore";

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
        $sessionStore.guesses.forEach((guess) => {
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
    {#if $sessionStore}
        <h2>{getHeading($sessionStore.status)}</h2>
        <h3>Ordet var: <span>{$sessionStore.word}</span></h3>
        <p>Det tog dig {$sessionStore.numberOfGuesses} gissningar.</p>
        <p>För att spela igen, tryck F5.</p>
        <br />
        <button on:click={insertToClipboard}> Dela satan </button>
    {/if}
</main>
