'use client';
import Word from "@/components/Word/Word";
import Space from "@/components/Word/Space";
import TypewriterInput from "@/components/Input/TypewriterInput";
import { useState, useRef, useEffect } from "react";
import { GAME_STATUS, KEYS, API_WORDS, ALPHABET } from "@/constants/game";
import useFetch from "@/hooks/useFetch";


interface TypewriterProps {
  gameStatus: symbol;
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

  if (isLoading) 
    return <p> Loading... </p>;

  if (error)
    return <p> Error: {error?.message} </p>;

  const handleStart = () => {
    if (gameStatus === GAME_STATUS.WAITING) {
      notifyStart();
      setInputValue([""]);
    }
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();
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
      className="relative px-4 pt-16 flex flex-wrap h-full w-full" 
      onMouseOver={() => inputRef.current?.focus()} 
      onFocus={() => inputRef.current?.focus()}
      tabIndex={0}
      >
      <TypewriterInput inputRef={inputRef} onKeyDown={handleInput} />

      {  
        words.map((word: string, index: number) => {
          const isActiveWord = index === activeWordIdx;
          const inputWord = (index < inputValue.length) ? inputValue[index] : "";

          return (
            <span key={word + String(index)} className="inline-block">
              <Word inputWord={inputWord} active={isActiveWord}>
                {word}
              </Word>
              <Space active={index === activeWordIdx && word.length === activeLetterIdx}/>
            </span>
          )
        })
      }
    </div>
  );
};

export default Typewriter;