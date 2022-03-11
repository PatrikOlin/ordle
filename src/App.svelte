<script lang="ts">
	import { onMount } from "svelte";
	import { getNewSession, guessWord } from "./shared/api";
	import { currentState, getSession, getSessionId } from "./shared/store";
	import Keydown from "svelte-keydown";
	import WordGrid from "./WordGrid.svelte";
	import Keyboard from "./Keyboard.svelte";
	// import Keyboard from "svelte-keyboard";

	let session = null;
	let wordStates: string[] = [];
	let guesses = [];
	let guess: string;
	let keys = [];
	let keyDown;
	let keyState = [];

	onMount(async () => {
		// currentState.newSession();
		getNewSession()
			.then((r) => r.json())
			.then((s) => {
				session = s;
			});
	});

	function submit() {
		// currentState.guessWord(guess, $getSessionId);
		guessWord(guess, session.id)
			.then((r) => r.json())
			.then((s) => {
				if (s) {
					session = s;
					createKeystate(s.guesses[s.guesses.length - 1]);
					guess = "";
					keys = [];
				}
				console.log(session);
				console.log(wordStates);
			});
	}

	function createKeystate({ word, wordState }) {
		word = word.split("");
		wordState = wordState.split("");
		keyState = word.map((key, i) => {
			return {
				key: key,
				value: wordState[i],
			};
		});
	}

	const onKeydown = (key: string) => {
		console.log(key);
		keyDown = key;
		if (key === "Enter" && keys.length === 5) submit();
		if (key === "Backspace") {
			keys.pop();
			keys = keys;
		}
		if (keys.length >= 5) return;
		if (key.length === 1 && key !== " ") keys = [...keys, key];

		console.log(keys);
		guess = keys.join("");
	};
</script>

<Keydown on:key={({ detail }) => onKeydown(detail)} />

<main>
	<h1>Ordle</h1>
	<WordGrid {session} {keys} />
	<!-- <Keyboard layout="wordle" /> -->
	<Keyboard {keyDown} {keyState} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	:global(.svelte-keyboard) {
		width: 37rem;
		margin: auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
