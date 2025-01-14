import { useMemo } from "react";
import Cursor from "./Cursor";

interface LetterProps {
  children: string;     // The letter to show
  inputLetter?: string; // The letter that the user has input
  correctLetter: string;// The correct letter
  active: boolean;      // If the letter is the active one
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
function Letter({ children, inputLetter = "", correctLetter, active, gameStatus }: LetterProps) {

  const letterStatusStyle = useMemo(() => {
    if (inputLetter === "")
      return STATUS.NOT_GUESSED;
    if (inputLetter === correctLetter)
      return STATUS.CORRECT;
    else
      return STATUS.INCORRECT;
  }, [inputLetter, active]);

  return (
    <span className="relative font-mono text-4xl">
      { active && <Cursor gameStatus={gameStatus}/> }
      <span className={`${letterStatusStyle}`}>
        {children}
      </span>
    </span>
  );
}

export default Letter;