import { writable, derived } from "svelte/store";
import { getNewSession, guessWord } from "../shared/api";

const initialState = {
  session: null,
  isLoading: false,
  error: null,
};

function createState() {
  const { subscribe, update } = writable(initialState);

  return {
    subscribe,
    newSession: async () => {
      update((state) => (state = { ...state, isLoading: true }));
      try {
        const res = await getNewSession();
        update((state) => (state = { ...state, session: res }));
      } catch (e) {
        alert(e);
      } finally {
        update((state) => (state = { ...state, isLoading: false }));
      }
    },
    guessWord: async (guess, id) => {
      update((state) => (state = { ...state, isLoading: true }));
      try {
        const res = await guessWord(guess, id);
        update((state) => (state = { ...state, session: res }));
      } catch (e) {
        alert(e);
      } finally {
        update((state) => (state = { ...state, isLoading: false }));
      }
    },
  };
}

export const currentState = createState();

export const getSession = derived(
  currentState,
  ($currentState) => $currentState.session
);
