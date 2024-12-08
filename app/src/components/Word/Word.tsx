import { useMemo } from "react";
import Letter from "../Letter";
import './styles.css';

interface WordProps {
  children: string;
  inputWord: string,
  active: boolean;
}

const STATUS = {
  CORRECT: "word-correct",
  INCORRECT: "word-incorrect",
  NOT_GUESSED: "word-not-guessed",
}

function Word({children, inputWord, active}: WordProps) {
  const word = children;

  const wordStatus = useMemo(() => {
    if (inputWord === "" || active)
      return STATUS.NOT_GUESSED;

    if (inputWord === word)
      return STATUS.CORRECT;
    else
      return STATUS.INCORRECT;
  }, [inputWord, active]);

  return (
    <span className={`font-monospace word ${wordStatus}`}>
      {  
        word.split('').map((letter, index) => {
          const isActiveLetter = active && index === inputWord.length;
          const inputLetter = (index < inputWord.length) ? inputWord[index] : "";
          return (
            <span key={letter + String(index)} className="letter">
              <Letter inputLetter={inputLetter} active={isActiveLetter}>
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