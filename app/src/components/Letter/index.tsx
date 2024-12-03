// import { ReactNode } from "react";


interface LetterProps {
  letter: string;
  active?: boolean;
}


function Letter({letter, active = false}: LetterProps) {
  return (
    <span className={`letter ${active ? "active" : ""}`}>{letter}</span>
  );
}

export default Letter;