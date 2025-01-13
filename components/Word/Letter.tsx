import { useMemo } from "react";
import { LETTER_STATUS as STATUS } from "@/constants/game";

interface LetterProps {
  children: string;
  inputLetter?: string;
  active: boolean;
}



function Letter({children, inputLetter = "", active}: LetterProps) {
  const letter = children;

  const letterStatusStyle = useMemo(() => {
    if (inputLetter === "")
      return STATUS.NOT_GUESSED;

    if (inputLetter === letter)
      return STATUS.CORRECT;
    else
      return STATUS.INCORRECT;
  }, [inputLetter, active]);

  return (
    <span className="relative font-mono text-4xl">
      { active && <span className="absolute left-[-12px] text-yellow">|</span> }
      <span className={`${letterStatusStyle}`}>
        {letter}
      </span>
    </span>
  );
}

export default Letter;