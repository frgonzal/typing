/**
 * @constant {Object} GAME_STATUS - An object representing the different statuses of the game.
 * @property {symbol} WAITING - The game is waiting to start.
 * @property {symbol} RUNNING - The game is currently running.
 * @property {symbol} PAUSED - The game is paused.
 * @property {symbol} ENDED - The game has ended.
 */
export const GAME_STATUS = Object.freeze({
  WAITING: Symbol("waiting"),
  RUNNING: Symbol("running"),
  PAUSED: Symbol("paused"),
  ENDED: Symbol("ended"),
});

/**
 * @constant {number} INITIAL_TIME - The initial time (in seconds) for the game.
 */
export const INITIAL_TIME = 30;

/**
 * @constant {Object} KEYS - An object representing key constants used in the game.
 * @property {string} BACKSPACE - The Backspace key.
 * @property {string} SPACE - The Space key.
 * @property {string} TAB - The Tab key.
 */
export const KEYS = Object.freeze({
  BACKSPACE: "Backspace",
  SPACE: " ",
  TAB: "Tab",
});

/**
 * @constant {number} TOTAL_WORDS - The total number of words to be used in the game.
 */
export const TOTAL_WORDS = 15;

/**
 * @constant {string} API_WORDS - The URL to fetch random words from an API.
 */
export const API_WORDS = `https://random-word-api.vercel.app/api?words=${TOTAL_WORDS}`;

/**
 * @constant {RegExp} ALPHABET - A regular expression to match alphanumeric characters and hyphens.
 */
export const ALPHABET = /^[a-zA-Z0-9\-]$/;

/**
 * @constant {Object} LETTER_STATUS - An object representing the status of each letter in the game.
 * @property {string} CORRECT - The class name for a correctly guessed letter.
 * @property {string} INCORRECT - The class name for an incorrectly guessed letter.
 * @property {string} NOT_GUESSED - The class name for a letter that has not been guessed yet.
 */
export const LETTER_STATUS = {
  CORRECT: "text-white",
  INCORRECT: "text-red",
  NOT_GUESSED: "text-smooth-white",
}
