const baseURL = "http://localhost:4040";

export async function getNewSession() {
  const url = `${baseURL}/session`;
  const res = await fetch(url);
  return res;
}

export async function guessWord(guess: string, id: string) {
  const url = `${baseURL}/word/${id}`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ word: guess }),
  });
  return res;
}
