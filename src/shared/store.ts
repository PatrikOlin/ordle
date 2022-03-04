import { readable } from "svelte/store";

const initialState = {
  session: null,
  isLoading: false,
  error: null,
};

let session = readable(initialState.session, (set) => {});
