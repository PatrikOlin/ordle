import { sessionID } from "./sessionStore";
import { get } from "svelte/store";

const baseURL = "http://localhost:4040";

export async function getSession() {
  const url = `${baseURL}/session`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  return res;
}

export async function guessWord(guess: string) {
  const url = `${baseURL}/word`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ word: guess }),
  });
  return res;
}
