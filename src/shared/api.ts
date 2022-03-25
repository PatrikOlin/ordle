import { sessionID } from "./sessionStore";
import { get } from "svelte/store";

const baseURL = "http://localhost:4040";

export async function getNewSession() {
  const url = `${baseURL}/session`;
  const res = await fetch(url);
  return res;
}

export async function guessWord(guess: string) {
  const url = `${baseURL}/word/${get(sessionID)}`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ word: guess }),
  });
  return res;
}
