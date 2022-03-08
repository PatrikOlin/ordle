import { get, writable, derived } from "svelte/store";
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
    guessWord: async (guess) => {
      update((state) => (state = { ...state, isLoading: true }));
      try {
        const res = await guessWord(guess, sessionId);
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

export const getSessionId = derived(
  currentState,
  ($currentState) => $currentState.session?.id
);
