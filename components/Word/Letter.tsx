import { useMemo } from "react";
import Cursor from "./Cursor";

interface LetterProps {
  letter?: string;     // The letter to show. If "" then is not correct
  input?: string;      // The letter that the user has input. If "" then is not guessed
  active: boolean;    // If the letter is the active one
  gameStatus: symbol;
}

const STATUS = Object.freeze({
  CORRECT: "text-foreground",
  INCORRECT: "text-red",
  NOT_GUESSED: "text-smooth-white",
})

/**
 * Letter component
 * - Shows a letter with a different style depending on the input
 * - If the input is empty, the letter is not guessed
 * - If the input is the correct letter, the letter is correct
 * - If the input is not the correct letter, the letter is incorrect
 * - If the letter is active, a cursor is shown
 */
function Letter({ letter, input, active, gameStatus }: LetterProps) {

  const letterStatusStyle = useMemo(() => {
    if (input === undefined)
      return STATUS.NOT_GUESSED;
    if (letter === undefined || input !== letter)
      return STATUS.INCORRECT;
    else
      return STATUS.CORRECT;
  }, [input, letter]);

  return (
    <span className="relative font-mono text-4xl">
      { active && 
        <Cursor gameStatus={gameStatus}/> 
      }
      <span className={`${letterStatusStyle}`}>
        {letter === undefined ? input : letter}
      </span>
    </span>
  );
}

export default Letter;