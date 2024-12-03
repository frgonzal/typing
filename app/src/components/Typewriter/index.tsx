import Word from "../Word";
import { useState } from "react";

interface TypewriterProps {
  onClick: () => void;
}

function Typewriter({onClick}: TypewriterProps) {
  const words = ["Hello", "World", "Typewriter", "Effect"];
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  return (
    <div className="ps-4" onClick={onClick}>
      <input className="disabled"></input>

      {words.map((word, index) => {
        return (
          <Word key={index} word={word} active={activeWordIndex === index}/>
        );
      })}

    </div>
  );
};


export default Typewriter;