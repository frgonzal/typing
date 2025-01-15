'use client';
import Word from "@/components/Word/Word";
import Space from "@/components/Word/Space";
import TypewriterInput from "@/components/Input/TypewriterInput";
import React, { useState, useRef, useEffect, act } from "react";
import { GAME_STATUS } from "@/constants/game";
import useRange from "@/hooks/useRange";


interface TypewriterProps {
  words: string[];
  inputValue: string[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  error: Error | undefined;
  gameStatus: symbol;
  activeWordIdx: number;
  activeLetterIdx: number;
  handleInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Typewriter = ({ words, inputValue, inputRef, containerRef, isLoading, error, gameStatus, activeWordIdx, activeLetterIdx, handleInput }: TypewriterProps) => {

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
    <>
      <TypewriterInput inputRef={inputRef} onKeyDown={handleInput} />
      <div 
        ref={containerRef}
        className="relative w-full max-w-[1900px] overflow-hidden flex flex-wrap px-32" 
        style= {{ lineHeight: "4rem", height: "20rem" }}
        onMouseOver={() => inputRef?.current?.focus()} 
        onFocus={() => inputRef?.current?.focus()}
        tabIndex={1}
      >
        {  
          words.map((word: string, index: number) => {
            const isActiveWord = index === activeWordIdx;
            const inputWord = (index < inputValue.length) ? inputValue[index] : "";
            // console.log(inputValue, inputWord, index, activeWordIdx, activeLetterIdx);

            return (
              <span 
                key={word + String(index)} 
                className="block"
              >
                <Word inputWord={inputWord} active={isActiveWord} gameStatus={gameStatus}>
                  {word}
                </Word>

                <Space active={index === activeWordIdx && word.length <= activeLetterIdx} gameStatus={gameStatus}/>
              </span>
            )
          })
        }
      </div>
    </>
  );
};

export default Typewriter;