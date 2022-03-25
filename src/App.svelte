<script lang="ts">
	import { onMount } from "svelte";
	import { getNewSession, guessWord } from "./shared/api";
	import Keydown from "svelte-keydown";
	import WordGrid from "./WordGrid.svelte";
	import Keyboard from "./Keyboard.svelte";
	import EndScreen from "./EndScreen.svelte";
	import Modal, { getModal } from "./Modal.svelte";
	import Toast from "./Toast.svelte";
	import { toast } from "./shared/toastStore";
	import { sessionStore } from "./shared/sessionStore";

	let guess: string;
	let keys = [];
	let keyState = [];

	onMount(async () => {
		getNewSession()
			.then((r) => r.json())
			.then((s) => {
				$sessionStore = s;
			});
	});

	function submit() {
		guessWord(guess)
			.then((r) => {
				if (r.ok) return Promise.resolve(r.json());
				return Promise.resolve(r.json()).then((res: any) => {
					return Promise.reject(res.message);
				});
			})
			.then((s) => {
				if (s) {
					$sessionStore = s;
					createKeystate(s.guesses[s.guesses.length - 1]);
					guess = "";
					keys = [];
					if (s.status === "solved" || s.numberOfGuesses === 6) {
						getModal().open();
						$toast = getToastMsg(s.numberOfGuesses);
					}
				}
			})
			.catch((err) => ($toast = err));
	}

	function createKeystate({ word, wordState }) {
		word = word.split("");
		wordState = wordState.split("");
		keyState = word.map((key, i) => {
			return {
				key: key,
				value: wordState[i],
				row: $sessionStore.numberOfGuesses,
			};
		});
	}

	const getToastMsg = (numOfGuesses: number): string => {
		if (numOfGuesses === 6) return "Dåligt!";
		if (numOfGuesses === 5) return "Svagt!";
		if (numOfGuesses < 5) return "Genialt!";
	};

	const onKeydown = (key: string) => {
		if (key.toLowerCase() === "enter" && keys.length === 5) submit();
		if (key.toLowerCase() === "backspace") {
			keys.pop();
			keys = keys;
		}
		if (keys.length >= 5) return;
		if (key.length === 1 && key !== " ") keys = [...keys, key];

		guess = keys.join("");
	};

	const handleKeyClick = ({ detail }) => {
		onKeydown(detail);
	};
</script>

<Keydown on:key={({ detail }) => onKeydown(detail)} />

<main>
	<Toast />
	<h1>Ordle</h1>
	<WordGrid {keys} />
	<Keyboard {keyState} on:keyClick={handleKeyClick} />
	<Modal><EndScreen /></Modal>
</main>

<style>
	:root {
		--green: #43aa8b;
		--yellow: #d99a08;
		--bg: #201e1f;
		--white: #faf5f0;
		--red: #ff3e00;
	}

	:global(body) {
		background-color: var(--bg);
		font-family: "Work Sans", sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	#modal {
		background-color: var(--bg);
	}

	h1 {
		color: var(--red);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 200;
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
