import Letter from "../Letter";
import './styles.css'

interface WordProps {
  children: string;
  wordIdx: number;
  active: boolean;
  activeLetterIdx: number;
  inputRef: React.RefObject<HTMLInputElement>;
}


function Word({children, wordIdx, active, activeLetterIdx, inputRef}: WordProps) {
  const word = children;

  return (
    <span className={`word font-monospace ${active ? "active" : ""}`}>
      {  
        word.split('').map((letter, index) => {
          return (
            <span key={letter + String(index)} className="letter">
              <Letter wordIdx={wordIdx} letterIdx={index} active={active && index === activeLetterIdx} inputRef={inputRef}>
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