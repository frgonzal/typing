import Letter from "../Letter";

interface WordProps {
  word: string;
  active?: boolean;
  activeLetterIndex?: number;
}


function Word({word, active = false, activeLetterIndex = 0}: WordProps) {
  return (
    <span className={`word ${active ? "active" : ""}`}>
      {word.split('').map((letter, index) => {
        return (
          <Letter key={index} letter={letter} active={active && index === activeLetterIndex}/>
        )})}
    </span>
  );
}

export default Word;