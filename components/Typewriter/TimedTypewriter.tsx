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
  reload: number;
}

const Typewriter = ({ gameStatus, notifyStart, reload }: TypewriterProps) => {
  const [inputValue, setInputValue] = useState<string[]>([""]);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const activeWordIdx = Math.max(inputValue.length - 1, 0);
  const activeLetterIdx = inputValue[activeWordIdx]?.length || 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: refreshData, error, isLoading: _} = useFetch<string[]>(API_WORDS, reloadTrigger);

  const words = data;


  useEffect(() => {
    if (data.length === 0 && refreshData && isLoading) {
      setData(refreshData ?? data);
      setReloadTrigger(reloadTrigger + 1);
      setIsLoading(false);
    }
  }, [refreshData]);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.WAITING) {
      setData(refreshData ?? data);
      setReloadTrigger(reloadTrigger + 1);
      setInputValue([""]);
    }
    inputRef.current?.focus();
  }, [gameStatus, reload]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full font-monofett text-4xl text-foreground">
        loading...
      </div>
    );
  }

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

    if (e.key === KEYS.SPACE) {
      if (activeLetterIdx === 0) 
        return;

      if (activeWordIdx === words.length - 1 && activeLetterIdx === words[activeWordIdx].length) {
        setInputValue([""]);
        setData(refreshData ?? data);
        setReloadTrigger(reloadTrigger + 1);
        return;
      }

      setInputValue((words: string[]) => {
        const newWords = [...words];
        newWords.push("");
        return newWords;
      });
    }

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
      className="relative px-32 flex flex-wrap h-full w-full gap-y-6" 
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
            <span 
              key={word + String(index)} 
              className="inline-block"
            >
              <Word inputWord={inputWord} active={isActiveWord} gameStatus={gameStatus}>
                {word}
              </Word>

              <Space active={index === activeWordIdx && word.length <= activeLetterIdx}/>
            </span>
          )
        })
      }
    </div>
  );
};

export default Typewriter;