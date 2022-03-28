<script lang="ts">
    import Distribution from "./Distribution.svelte";
    import { sessionStore, stats } from "./shared/sessionStore";
    import Stat from "./Stat.svelte";

    let winPercentage = 0;
    let maxStreak = 0;
    let currentStreak = 0;
    let oneGuess = 0;
    let twoGuesses = 0;
    let threeGuesses = 0;
    let fourGuesses = 0;
    let fiveGuesses = 0;
    let sixGuesses = 0;
    let unsolved = 0;
    let maxValue;

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

    const updateStats = () => {
        if ($stats) {
            setTimeout(() => {
                winPercentage = $stats.winPercentage;
                maxStreak = $stats.maxStreak;
                currentStreak = $stats.currentStreak;
                oneGuess = $stats.winDistribution.firstGuess;
                maxValue = oneGuess;
                twoGuesses = $stats.winDistribution.secondGuess;
                if (twoGuesses > maxValue) maxValue = twoGuesses;
                threeGuesses = $stats.winDistribution.thirdGuess;
                if (threeGuesses > maxValue) maxValue = threeGuesses;
                fourGuesses = $stats.winDistribution.thirdGuess;
                if (fourGuesses > maxValue) maxValue = fourGuesses;
                fiveGuesses = $stats.winDistribution.fifthGuess;
                if (fiveGuesses > maxValue) maxValue = fiveGuesses;
                sixGuesses = $stats.winDistribution.sixthGuess;
                if (sixGuesses > maxValue) maxValue = sixGuesses;
                unsolved = $stats.winDistribution.unsolved;
                if (twoGuesses > maxValue) maxValue = twoGuesses;
            }, 250);
        }
    };

    $: $stats, updateStats();
</script>

<main class="container">
    {#if $sessionStore}
        <h1>{getHeading($sessionStore.status)}</h1>
        <h3>Ordet var: <span>{$sessionStore.word}</span></h3>
        <div class="stats">
            <Stat value={winPercentage} key="Vinstprocent" />
            <Stat value={maxStreak} key="Längsta streak" />
            <Stat value={currentStreak} key="Nuvarande streak" />
        </div>
        <div class="distributions">
            <h3>Gissningsdistribution</h3>
            <Distribution value={oneGuess} key="1" {maxValue} />
            <Distribution value={twoGuesses} key="2" {maxValue} />
            <Distribution value={threeGuesses} key="3" {maxValue} />
            <Distribution value={fourGuesses} key="4" {maxValue} />
            <Distribution value={fiveGuesses} key="5" {maxValue} />
            <Distribution value={sixGuesses} key="6" {maxValue} />
        </div>
        <p>För att spela igen, tryck F5.</p>
        <br />
        <button on:click={insertToClipboard}> Skryt </button>
    {/if}
</main>

<style>
    .container {
        text-align: center;
        padding: 1rem;
    }
    .stats {
        display: flex;
        flex-direction: row;
    }
</style>
