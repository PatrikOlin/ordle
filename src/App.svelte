<script lang="ts">
	import { onMount } from "svelte";
	import { getNewSession, guessWord } from "./shared/api";
	import { currentState, getSession } from "./shared/store";
	import Keydown from "svelte-keydown";
	import WordGrid from "./WordGrid.svelte";

	let session = null;
	let wordState: string[] = [];
	let guess: string;

	onMount(async () => {
		currentState.newSession();
		// getNewSession()
		// 			.then((r) => r.json())
		// 			.then((s) => {
		// 				session = s;
		// 				wordState.push(s.wordState);
		// 				console.log(session);
		// 				console.log(wordState);
		// 			});
		console.log(getSession);
	});

	function submit() {
		currentState.guessWord(guess, $getSession.id);
		// guessWord(guess, session.id)
		// 			.then((r) => r.json())
		// 			.then((s) => {
		// 				session = s;
		// 				guess = "";
		// 				console.log(session);
		// 			});
	}
</script>

<Keydown on:Enter={(e) => submit()} />

<main>
	<p>{$getSession?.wordState}</p>
	<h1>Ordle</h1>
	<WordGrid session={$getSession} />
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
