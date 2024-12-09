import Word from "../Word";
import Space from "../Letter/Space";
import InputTypewriter from "./InputTypewriter";
import { useState, useRef, useEffect } from "react";
import './styles.css';
import { GAME_STATUS } from "../Game/Game";
import useFetch from "../../hooks/useFetch";

// const API_WORDS = 'https://random-word-api.herokuapp.com/word?number=42';
const API_WORDS = "http://localhost/words/api/10/"

const KEYS = {
  BACKSPACE: "Backspace",
  SPACE: " ",
}

const ALPHABET = /^[a-zA-Z0-9]$/;

interface TypewriterProps {
  gameStatus: string;
  notifyStart: () => void;
}

const Typewriter = ({gameStatus, notifyStart}: TypewriterProps) => {
  const [inputValue, setInputValue] = useState<string[]>([""]);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const activeWordIdx = Math.max(inputValue.length - 1, 0);
  const activeLetterIdx = inputValue[activeWordIdx]?.length || 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading } = useFetch<string[]>(API_WORDS, reloadTrigger);
  const words = data || [];

  useEffect(() => {
    if (gameStatus === GAME_STATUS.WAITING) {
      setReloadTrigger(reloadTrigger + 1);
      setInputValue([""]);
    }
    inputRef.current?.focus();
  }, [gameStatus]);

  if (isLoading) return <p> Loading...</p>;
  if (data === undefined) return <p>Error: {error?.message}</p>;

  const handleStart = () => {
    if (gameStatus === GAME_STATUS.WAITING) {
      notifyStart();
      setInputValue([""]);
    }
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (gameStatus === GAME_STATUS.ENDED) 
      return;
    if (gameStatus === GAME_STATUS.WAITING) {
      if (!ALPHABET.test(e.key))
        return;
      handleStart();
    }

    if (e.key == KEYS.BACKSPACE) {
      if (activeWordIdx === 0 && activeLetterIdx === 0) {
        return;
      }
      setInputValue((words: string[]) => {
        const newWords = [...words];
        if (activeLetterIdx > 0) {
          newWords[activeWordIdx] = newWords[activeWordIdx].slice(0, activeLetterIdx - 1);
        } else {
          newWords.pop();
        }
        return newWords;
      });
      return;
    }

    if (activeWordIdx === words.length) {
      return;
    }

    if (e.key === KEYS.SPACE) {
      if (activeLetterIdx === 0) 
        return;
      setInputValue((words: string[]) => {
        const newWords = [...words];
        newWords.push("");
        return newWords;
      });
    }

    if (activeLetterIdx >= words[activeWordIdx].length)
      return;

    if (ALPHABET.test(e.key)) {
      setInputValue((words: string[]) => {
        const newWords = [...words];
        newWords[activeWordIdx] += e.key;
        return newWords;
      });
    }
  }

  return (
    <div 
      className="ps-4" 
      onMouseOver={() => inputRef.current?.focus()} 
      tabIndex={0}>
      <InputTypewriter inputRef={inputRef} onKeyDown={handleInput} />
        {  
          words.map((word: string, index: number) => {
            const isActiveWord = index === activeWordIdx;
            const inputWord = (index < inputValue.length) ? inputValue[index] : "";

            return (
              <span key={word + String(index)} className="word-space">
                <Word inputWord={inputWord} active={isActiveWord}>
                  {word}
                </Word>
                <Space active={index === activeWordIdx && word.length === activeLetterIdx}/>
              </span>
            )}
          )
        }
    </div>
  );
};

export default Typewriter;