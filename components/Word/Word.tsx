import { useMemo } from "react";
import Letter from "@/components/Word/Letter";


const STATUS = Object.freeze({
  CORRECT: "",
  INCORRECT: "border-b-2 border-red",
  NOT_GUESSED: "",
})


interface WordProps {
  word: string; // The word to show
  input: string,// The word that the user has input
  active: boolean;  // If the word is the active one
  gameStatus: symbol;
}


/**
 * Component to display a word with individual letters, highlighting the user's input and the active letter.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.word - The word to display.
 * @param {string} props.input - The word that the user has input.
 * @param {boolean} props.active - If the word is the active one.
 * @param {symbol} props.gameStatus - The current status of the game.
 * 
 * @returns {JSX.Element} The rendered Word component.
 */
const Word = ({ word, input, active, gameStatus }: WordProps): React.ReactElement => {

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