import { writable, derived } from "svelte/store";

// export interface Session {
//   id: string;
//   guesses: any[];
//   numberOfGuesses: number;
//   status: string;
// }

const initialSession = {
  id: "",
  guesses: [],
  numberOfGuesses: 0,
  status: "unsolved",
};

export const sessionStore = writable(initialSession);

export const sessionID = derived(
  sessionStore,
  ($sessionStore) => $sessionStore.id
);
