import { useMemo } from "react";
import './styles.css'

interface LetterProps {
  children: string;
  wordIdx: number;
  letterIdx: number;
  active: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const STATUS = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
  NOT_GUESSED: "not-guessed",
}

function checkLetter(letter: string, wordIdx: number, letterIdx: number, inputRef: React.RefObject<HTMLInputElement>) {
  const value = inputRef?.current?.value;
  if (!value) 
    return STATUS.NOT_GUESSED;

  const words = value.split(" ");
  if (wordIdx >= words.length)
    return STATUS.NOT_GUESSED;

  const letters = words[wordIdx];
  if (letterIdx >= letters.length) {
    return STATUS.NOT_GUESSED;
  } else if (words[wordIdx][letterIdx] === letter) {
    return STATUS.CORRECT;
  } else {
    return STATUS.INCORRECT;
  }
}


function Letter({children, wordIdx, letterIdx, active, inputRef}: LetterProps) {
  const letterStatus = useMemo(() => {
    return checkLetter(children, wordIdx, letterIdx, inputRef);
  }, [active]);

  return (
    <span 
      className={`font-monospace letter ${active ? "active" : ""} ${letterStatus}`}>
      {children}
    </span>
  );
}

export default Letter;