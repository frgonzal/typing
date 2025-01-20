import { useMemo } from "react";
import Letter from "@/components/Word/Letter";


interface WordProps {
  word: string; // The word to show
  input: string,// The word that the user has input
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
function Word({ word, input, active, gameStatus }: WordProps) {

  const wordToDisplay = 
    (word.length >= input.length) ?
    word : word + input.slice(word.length);

  const wordStatus = useMemo(() => {
    if (input === "" || active)
      return STATUS.NOT_GUESSED;
    if (input === word)
      return STATUS.CORRECT;
    else
      return STATUS.INCORRECT;
  }, [input, word, active]);

  return (
    <span className={`${wordStatus}`}>
      {  
        wordToDisplay.split("").map((letter, index) => {
          const isActiveLetter = active && index === input.length;
          const inputLetter = (index < input.length) ? input[index] : undefined;
          const correctLetter = (index < word.length) ? word[index] : undefined;

          return (
            <span key={letter + String(index)}>
              <Letter 
                letter={correctLetter} 
                input={inputLetter} 
                active={isActiveLetter} 
                gameStatus={gameStatus}
              />
            </span>
          )}
        )
      }
    </span>
  );
}

export default Word;