'use client';
import { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
import { GAME_STATUS, ALPHABET } from "@/constants/game";
import useFetchFaster from "@/hooks/useFetchFaster";
import TypewriterBox from "./TypewriterBox";
import setInputNormal from "@/lib/setInputNormal";
import Timer from "@/components/Progress/Timer";
import { INITIAL_TIME } from "@/constants/game";
import useLinesRange from "@/hooks/useLinesRange";
import { ActiveInfo } from "@/types/status";
import { NUMBER_OF_LINES } from "@/constants/typewriter";
import TimedStatistics from "@/components/Dashboard/TimedStatistics";

interface TypewriterProps {
  gameStatus: symbol;
  setGameStatus: (v: SetStateAction<symbol>) => void;
  reload: number;
}

const TimedTypewriter = ({ gameStatus, setGameStatus, reload }: TypewriterProps) => {
  const [reloadDataTrigger, reloadData] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string[]>([""]);
  const [accInput, setAccInput] = useState<string[]>([""]);
  const [words, setWords] = useState<string[]>([]);
  const [accWords, setAccWords] = useState<string[]>([]);

  const activeInfo: ActiveInfo = {
    /* Last word and the next of the last letter */
    word: {
      idx: inputValue.length - 1, 
      length: inputValue[inputValue.length - 1].length,
    },
    letter: {
      idx: inputValue[inputValue.length - 1].length,
    }
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useFetchFaster<string>(reloadDataTrigger);
  const { firstWordIdx, lastWordIdx, isFull } = useLinesRange(containerRef.current, gameStatus, activeInfo.word.idx, NUMBER_OF_LINES);


  const clenaup = useCallback(() => {
    setInputValue([""]);
    setAccInput([""]);
    setWords([]);
    setAccWords([]);
    reloadData(n => n + 1);
  }, []);

  const handleEnd = useCallback(() => {
    setGameStatus(GAME_STATUS.ENDED);
  }, []);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameStatus === GAME_STATUS.ENDED) 
      return;
    if (gameStatus === GAME_STATUS.PAUSED)
      return;

    if (gameStatus === GAME_STATUS.WAITING) {
      if (!ALPHABET.test(e.key))
        return;
      setGameStatus(GAME_STATUS.RUNNING);
    }
    setInputNormal(e.key, [setInputValue, setAccInput]);
  }

  /* Load data when the component mounts */
  useEffect(() => {
    if (data){
      setWords(prev => [...prev, ...data]);
      setAccWords(prev => [...prev, ...data]);
    }
  }, [data]);

  /* Handle game status changes */
  useEffect(() => {
    if (gameStatus === GAME_STATUS.WAITING){
      clenaup();
    }
    containerRef.current?.focus();
  }, [gameStatus, reload, clenaup]);

  /* Remove frange 0 to firstWordIdx  when the last word is reached */
  useEffect(() => {
    if (lastWordIdx < activeInfo.word.idx) {
      setWords(prev => prev.slice(firstWordIdx + 1, undefined));
      setInputValue(prev => prev.slice(firstWordIdx + 1, undefined));
    }
  }, [lastWordIdx, activeInfo.word.idx, firstWordIdx]);

  /* Load more data when the last word is reached */
  useEffect(() => {
    if (!isFull)
      reloadData(n => n + 1);
  }, [isFull, activeInfo.letter.idx]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full font-monofett text-4xl text-foreground">
        loading...
      </div>
    );
  }

  if (error){
    return <p> Error: {error?.message} </p>;
  }

  return (
    <>
      { gameStatus !== GAME_STATUS.WAITING && gameStatus !== GAME_STATUS.ENDED && 
        <div className="absolute top-4 left-32">
          <Timer 
            gameStatus={gameStatus} 
            initialTime={INITIAL_TIME} 
            handleEnd={handleEnd}
          />
        </div>
      }

      { gameStatus === GAME_STATUS.ENDED &&
        <TimedStatistics words={accWords} inputWords={accInput} time={INITIAL_TIME}/>
      }

      { gameStatus !== GAME_STATUS.ENDED &&
        <TypewriterBox
          words={words}
          inputWords={inputValue}
          activeInfo={activeInfo}
          gameStatus={gameStatus}
          handleInput={handleInput}
          containerRef={containerRef}
        />
      }
    </>
  )
};

export default TimedTypewriter;