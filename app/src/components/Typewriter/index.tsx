import Word from "../Word";
import { useState, useRef, useEffect } from "react";
import './styles.css';

const API_WORDS = 'https://random-word-api.herokuapp.com/word?number=42';

const KEYS = {
  BACKSPACE: "Backspace",
  SPACE: " ",
}

interface TypewriterProps {
  hasEnded: boolean;
  notifyStart: () => void;
}

function Typewriter({hasEnded, notifyStart}: TypewriterProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_WORDS);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWords(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const focusInput = () => {
    const input = inputRef.current;
    if (input) input.focus(); 
  }

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      focusInput();
      notifyStart();
    }
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (hasEnded) return;

    const input = inputRef?.current;
    if (!input) return;

    if (activeWordIdx === words.length && e.key != KEYS.BACKSPACE) {
      return;
    }

    if (e.key === KEYS.SPACE) {
      if (activeLetterIdx === 0) 
        return;
      input.value += " ";
      setActiveWordIdx((idx: number) => idx + 1);
      setActiveLetterIdx(0);
      return;
    }

    if (e.key == KEYS.BACKSPACE) {
      input.value = input.value.slice(0, -1); 
      if (activeLetterIdx > 0) {
        setActiveLetterIdx((idx: number) => idx - 1);
      } else if (activeWordIdx > 0) {
        setActiveWordIdx((idx: number) => idx - 1);
        const inputWord = input.value.split(" ")[activeWordIdx - 1];
        setActiveLetterIdx(inputWord.length);
      }
      return;
    }

    if (activeLetterIdx >= words[activeWordIdx].length)
      return;

    const alphanumericRegex = /^[a-zA-Z0-9]$/;
    if (alphanumericRegex.test(e.key)) {
      input.value += e.key;
      setActiveLetterIdx((idx: number) => idx + 1);
      if (activeLetterIdx === words[activeWordIdx].length) {
        setActiveWordIdx((idx: number) => idx + 1);
        setActiveLetterIdx(0);
      }
      return;
    }
  }

  return (
    <div 
      className="ps-4" 
      onMouseOver={focusInput} 
      onKeyDown={handleStart} 
      tabIndex={0}>
      <input ref={inputRef} id="input-typewriter" onKeyDown={handleInput} autoFocus></input>

      {words.map((word: string, index: number) => {
          return (
            <span key = {word + String(index)}>
              <Word wordIdx={index} active={activeWordIdx === index} activeLetterIdx={activeLetterIdx} inputRef={inputRef}>
                {word}
              </Word>
            </span>
          );
        })
      }
    </div>
  );
};


export default Typewriter;