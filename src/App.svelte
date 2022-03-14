<script lang="ts">
	import { onMount, getContext } from "svelte";
	import { getNewSession, guessWord } from "./shared/api";
	import Keydown from "svelte-keydown";
	import WordGrid from "./WordGrid.svelte";
	import Keyboard from "./Keyboard.svelte";
	import WinScreen from "./WinScreen.svelte";
 	import Modal, {getModal} from './Modal.svelte';

	let session = null;
	let wordStates: string[] = [];
	let guesses = [];
	let guess: string;
	let keys = [];
	let keyDown;
	let keyState = [];


	onMount(async () => {
		getNewSession()
			.then((r) => r.json())
			.then((s) => {
				session = s;
				console.log(s)
			});
	});

	function submit() {
		guessWord(guess, session.id)
			.then((r) => r.json())
			.then((s) => {
				if (s) {
					session = s;
					createKeystate(s.guesses[s.guesses.length - 1]);
					guess = "";
					keys = [];
					if (s.status === 'solved') getModal().open()
				}
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
		keyDown = key;
		if (key === "Enter" && keys.length === 5) submit();
		if (key === "Backspace") {
			keys.pop();
			keys = keys;
		}
		if (keys.length >= 5) return;
		if (key.length === 1 && key !== " ") keys = [...keys, key];

		guess = keys.join("");
	};
</script>

<Keydown on:key={({ detail }) => onKeydown(detail)} />

<main>
	<h1>Ordle</h1>
	<WordGrid {session} {keys} />
	<Keyboard {keyDown} {keyState} />
	<Modal>A winner is you</Modal>
</main>

<style>

 	:root {
		--green: #43AA8B;
		--yellow: #D99A08;
		--bg: #201E1F;
		--white: #FAF5F0;
	}

 	:global(body) {
		background-color: var(--bg);
	}

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

    :global(button.correct, section div.correct) {
        background-color: var(--green);
    }

    :global(button.correctish, section div.correctish) {
        background-color: var(--yellow);
    }

    :global(button.wrong, section div.wrong) {
        background-color: #3a3a3c;
    }

 	:global(button) {
        background-color: #818384;
        color: var(--white);
	}

</style>
