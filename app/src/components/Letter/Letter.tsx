import { useMemo } from "react";
import './styles.css'

interface LetterProps {
  children: string;
  inputLetter?: string;
  active: boolean;
}

const STATUS = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
  NOT_GUESSED: "not-guessed",
}

function Letter({children, inputLetter = "", active}: LetterProps) {
  const letter = children;

  const letterStatus = useMemo(() => {
    if (inputLetter === "")
      return STATUS.NOT_GUESSED;

    if (inputLetter === letter)
      return STATUS.CORRECT;
    else
      return STATUS.INCORRECT;

  }, [inputLetter, active]);

  return (
    <span className={`font-monospace letter ${active ? "active" : ""} ${letterStatus}`}>
      {letter}
    </span>
  );
}

export default Letter;