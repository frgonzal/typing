import { KEYS, ALPHABET } from "@/constants/game";
import { Dispatch, SetStateAction } from "react";

/**
 * Updates the input value based on the provided key input.
 *
 * @param inputKey - The key that was pressed.
 * @param setInputValue - The state setter function to update the input value.
 * @param offset - The offset to determine the starting index for backspace operations. Defaults to 0.
 * @param maxWordLength - The maximum length of a word. Defaults to 10.
 *
 * The function handles the following key inputs:
 * - BACKSPACE: Removes the last character of the current word or the last word if the current word is empty.
 * - SPACE: Adds a new empty word if the current word is not empty.
 * - ALPHABET: Adds the input key to the current word if it matches the ALPHABET regex and the word length is less than maxWordLength.
 * - Any other key: No operation is performed.
 */
const setInputNormal = (
  inputKey: string, 
  setInputValue: Dispatch<SetStateAction<string[]>>,
  offset: number = 0,
  maxWordLength: number = 10
) => {
  setInputValue((words: string[]) => {
    const activeWordIdx = words.length - 1;
    const activeLetterIdx = words[activeWordIdx].length;

    if (inputKey == KEYS.BACKSPACE) {
      if (activeWordIdx === offset && activeLetterIdx === 0)
        return words;

      if (activeWordIdx === 0 && activeLetterIdx === 0)
        return words;


      const lastWord = words[words.length - 1];
      const newWords = words.slice(0, -1);

      if (activeLetterIdx > 0)
        return [...newWords, lastWord.slice(0, -1)];
      return newWords;

    } else if (inputKey === KEYS.SPACE) {
      if (activeLetterIdx === 0) 
        return words;
      return [...words, ""]

    } else if (ALPHABET.test(inputKey)) {
      if (words[words.length - 1].length >= maxWordLength)
        return words;
      const newWords = [...words];
      newWords[newWords.length - 1] += inputKey;
      return newWords;

    } else {
      return words;
    }
  });
}

export default setInputNormal;