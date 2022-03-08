<script lang="ts">
	import { onMount } from "svelte";
	import { getNewSession, guessWord } from "./shared/api";
	import { currentState, getSession, getSessionId } from "./shared/store";
	import Keydown from "svelte-keydown";
	import WordGrid from "./WordGrid.svelte";

	let session = null;
	let wordStates: string[] = [];
    let guesses = [];
	let guess: string;

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
				guess = "";
			}
			console.log(session);
			console.log(wordStates);
		});
	}
</script>

<Keydown on:Enter={(e) => submit()} />

<main>
	<h1>Ordle</h1>
	<WordGrid {session} />
	<input bind:value={guess} />
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
