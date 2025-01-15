export const GAME_STATUS = Object.freeze({
  WAITING: Symbol(),
  RUNNING: Symbol(),
  PAUSED: Symbol(),
  ENDED: Symbol(),
});

export const INITIAL_TIME = 30;

export const KEYS = Object.freeze({
  BACKSPACE: "Backspace",
  SPACE: " ",
});

export const TOTAL_WORDS = 30;

export const API_WORDS = `https://random-word-api.vercel.app/api?words=${TOTAL_WORDS}`;

export const ALPHABET = /^[a-zA-Z0-9]$/;

export const LETTER_STATUS = {
  CORRECT: "text-white",
  INCORRECT: "text-red",
  NOT_GUESSED: "text-smooth-white",
}