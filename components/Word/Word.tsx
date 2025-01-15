import { useMemo } from "react";
import Letter from "@/components/Word/Letter";
import { input } from "framer-motion/client";
// import { input } from "framer-motion/client";

interface WordProps {
  children: string; // The word to show
  inputWord: string,// The word that the user has input
  active: boolean;  // If the word is the active one
  gameStatus: symbol;
}

const STATUS = Object.freeze({
  CORRECT: "",
  INCORRECT: "border-b-2 border-red",
  NOT_GUESSED: "",
})

/**
 * Word component
 * - Shows a word with a different style depending on the input
 * - If the input is empty, the word is not guessed
 * - If the input is the correct word, the word is correct
 * - If the input is not the correct word, the word is incorrect
 * - If the word is active, a cursor is shown
 * - If the input is longer than the word, the word is shown with the input
 */
function Word({ children, inputWord, active, gameStatus }: WordProps) {
  const word = children;

  const wordToDisplay = 
    (word.length >= inputWord.length) ?
    word : word + inputWord.slice(word.length);

  const wordStatus = useMemo(() => {
    if (inputWord === "" || active)
      return STATUS.NOT_GUESSED;
    if (inputWord === word)
      return STATUS.CORRECT;
    else
      return STATUS.INCORRECT;
  }, [inputWord, word, active]);

  return (
    <span className={`${wordStatus}`}>
      {  
        wordToDisplay.split('').map((letter, index) => {
          const isActiveLetter = active && index === inputWord.length;
          const inputLetter = (index < inputWord.length) ? inputWord[index] : "";
          const correctLetter = (index < word.length) ? word[index] : "";

          return (
            <span key={letter + String(index)}>
              <Letter inputLetter={inputLetter} active={isActiveLetter} correctLetter={correctLetter} gameStatus={gameStatus}>
                {letter}
              </Letter>
            </span>
          )}
        )
      }
    </span>
  );
}

export default Word;