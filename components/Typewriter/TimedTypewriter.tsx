'use client';
import { useState, useRef, useEffect } from "react";
import { GAME_STATUS, ALPHABET } from "@/constants/game";
import useFetchFaster from "@/hooks/useFetchFaster";
import Typewriter from "./Typewriter";
import setInputNormal from "@/lib/setInputNormal";
import useRange from "@/hooks/useRange";


interface TypewriterProps {
  gameStatus: symbol;
  notifyStart: () => void;
  reload: number;
}

const TimedTypewriter = ({ gameStatus, notifyStart, reload }: TypewriterProps) => {
  const [inputValue, setInputValue] = useState<string[]>([""]);
  const activeWordIdx = inputValue.length - 1;
  const activeLetterIdx = inputValue[activeWordIdx].length;

  const inputRef = useRef<HTMLInputElement>(null);

  const [offset, setOffset] = useState(0);

  const { data, error, isLoading, loadMoreData, reloadData } = useFetchFaster<string>();
  const words = data ? data.slice(offset) : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const { firstWordIdx, lastWordIdx, isFull } = useRange(containerRef, gameStatus, activeWordIdx, 5);

  const handleReload = () => {
    reloadData();
    setInputValue([""]);
    setOffset(0);
  }

  useEffect(() => {
    if (gameStatus === GAME_STATUS.WAITING) {
      handleReload();
    }
    inputRef.current?.focus();
  }, [gameStatus, reload]);

  useEffect(() => {
    if (!isFull) {
      loadMoreData();
    }
  }, [isFull]);

  const handleStart = () => {
    if (gameStatus === GAME_STATUS.WAITING) {
      notifyStart();
      setInputValue([""]);
    }
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameStatus === GAME_STATUS.ENDED) 
      return;
    if (gameStatus === GAME_STATUS.WAITING) {
      if (!ALPHABET.test(e.key))
        return;
      handleStart();
    }

    setInputNormal(e.key, activeWordIdx, activeLetterIdx, setInputValue);
  }

  useEffect(() => {
    if (lastWordIdx < activeWordIdx) {
      setOffset(prev => prev + firstWordIdx + 1);
      setInputValue(prev => prev.slice(firstWordIdx + 1, undefined));
    }
  }, [lastWordIdx, activeWordIdx]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full font-monofett text-4xl text-foreground">
        loading...
      </div>
    );
  }

  if (error)
    return <p> Error: {error?.message} </p>;

  return (
    <Typewriter
      ref={containerRef}
      inputValue={inputValue}
      words={words}
      activeWordIdx={activeWordIdx}
      activeLetterIdx={activeLetterIdx}
      gameStatus={gameStatus}
      handleInput={handleInput}
      inputRef={inputRef}
      isLoading={isLoading}
      error={error}
    />
  )
};

export default TimedTypewriter;