import React, { useMemo } from "react";
import Cursor from "./Cursor";

const STATUS = Object.freeze({
  CORRECT: "text-foreground",
  INCORRECT: "text-red",
  NOT_GUESSED: "text-smooth-white",
})

interface LetterProps {
  letter?: string;     // The letter to show. If "" then is not correct
  input?: string;      // The letter that the user has input. If "" then is not guessed
  active: boolean;    // If the letter is the active one
  gameStatus: symbol;
}

/**
 * Component to display a single letter in a typing game.
 * 
 * @param {LetterProps} props - The properties for the Letter component.
 * @param {string} [props.letter] - The letter to show. If `undefined`, it is not correct.
 * @param {string} [props.input] - The letter that the user has input. If `undefined`, it is not guessed.
 * @param {boolean} props.active - If the letter is the active one.
 * @param {symbol} props.gameStatus - The current status of the game.
 * 
 * @returns {React.ReactElement} The rendered Letter component.
 */
const Letter = ({ letter, input, active, gameStatus }: LetterProps): React.ReactElement => {

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