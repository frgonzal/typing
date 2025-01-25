'use client';
import { useState, useRef, useEffect, SetStateAction, useCallback, useMemo } from "react";
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


/**
 * TimedTypewriter component handles the logic and UI for a timed typing game.
 * 
 * @component
 * @param {TypewriterProps} props - The properties for the TimedTypewriter component.
 * @param {symbol} props.gameStatus - The current status of the game.
 * @param {(v: SetStateAction<symbol>) => void} props.setGameStatus - Function to update the game status.
 * @param {number} props.reload - A trigger to reload the component.
 * 
 * @returns {JSX.Element} The rendered TimedTypewriter component.
 * 
 * @example
 * <TimedTypewriter gameStatus={GAME_STATUS.WAITING} setGameStatus={setGameStatus} reload={0} />
 * 
 * @remarks
 * This component uses several hooks to manage the state and side effects of the game, including:
 * - `useState` for managing local state.
 * - `useRef` for referencing the container element.
 * - `useEffect` for handling side effects.
 * - `useCallback` for memoizing functions.
 * - `useMemo` for memoizing computed values.
 * 
 * The component also uses custom hooks like `useFetchFaster` and `useLinesRange` to fetch data and manage the range of lines displayed.
 * 
 * The game logic includes handling different game statuses (WAITING, RUNNING, PAUSED, ENDED), managing user input, and updating the displayed words and input values.
 * 
 * The component conditionally renders a `Timer` component, a `TimedStatistics` component, and a `TypewriterBox` component based on the game status.
 */
const TimedTypewriter = ({ gameStatus, setGameStatus, reload }: TypewriterProps): React.ReactElement => {
  const [reloadDataTrigger, reloadData] = useState<number>(0);
  const [accInput, setAccInput] = useState<string[]>([""]);
  const [accWords, setAccWords] = useState<string[]>([]);
  // const [accTimes, setAccTimes] = useState<number[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const words = useMemo(() => accWords.slice(offset, undefined), [accWords, offset]);
  const inputValue = useMemo(() => accInput.slice(offset, undefined), [accInput, offset]);

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
  const { data, error, isLoading } = useFetchFaster<string[]>(reloadDataTrigger);

  const { firstWordIdx, lastWordIdx, isFull } = useLinesRange(containerRef.current, gameStatus, activeInfo.word.idx, NUMBER_OF_LINES);

  const clenaup = useCallback(() => {
    setAccInput([""]);
    setAccWords([]);
    reloadData(n => n + 1);
    setOffset(0);
  }, []);

  const handleEnd = useCallback(() => {
    setGameStatus(GAME_STATUS.ENDED);
  }, []);

  const handleInput = (input: string) => {
    if (gameStatus === GAME_STATUS.ENDED) 
      return;
    if (gameStatus === GAME_STATUS.PAUSED)
      return;

    if (gameStatus === GAME_STATUS.WAITING) {
      if (!ALPHABET.test(input))
        return;
      setGameStatus(GAME_STATUS.RUNNING);
    }
    setInputNormal(input, setAccInput, offset);
  }

  /* Load data when the component mounts */
  useEffect(() => {
    if (data) {
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
      setOffset(prev => prev + firstWordIdx + 1);
    }
  }, [lastWordIdx, activeInfo.word.idx, firstWordIdx]);

  /* Load more data when the last word is reached */
  useEffect(() => {
    if (!isFull) {
      reloadData(n => n + 1);
    }
  }, [isFull, activeInfo.word.idx, activeInfo.letter.idx]);


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