import Word from "@/components/Word/Word";
import Space from "@/components/Word/Space";
import TypewriterInput from "@/components/Input/TypewriterInput";
import { useRef, useState } from "react";
import HandImg from '@/public/hand-index-thumb.svg'
import BlurredBackground from '@/components/Decorator/BlurredBackground';
import Image from 'next/image';
import { ActiveInfo } from "@/types/status";
import { NUMBER_OF_LINES } from "@/constants/typewriter";




interface TypewriterProps {
  words: string[];
  inputWords: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  gameStatus: symbol;
  activeInfo: ActiveInfo;
  handleInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TypewriterBox = ({ words, inputWords, containerRef, gameStatus, activeInfo, handleInput }: TypewriterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const focusTimeout = useRef<NodeJS.Timeout>(null);

  const handleFocus = () => {
    if (focusTimeout.current) 
      clearTimeout(focusTimeout.current);
    inputRef.current?.focus();
    setIsFocused(true);
  }

  const handleBlur = () => {
    focusTimeout.current = setTimeout(() => {
      setIsFocused(false);
    }, 4000);
  }

  return (
    <>
      { !isFocused && 
        <BlurredBackground onClick={handleFocus}> 
          <div className="text-white text-3xl font-mono cursor-pointer flex items-center justify-center gap-8">
            <Image src={HandImg} alt="hand" width={50} className='-rotate-45'/>
            Click here to focus
          </div>
        </BlurredBackground>
      }

      <TypewriterInput 
        inputRef={inputRef} 
        onKeyDown={handleInput} 
        onFocus={handleFocus} 
        onBlur={handleBlur}
      />

      <div className="px-32">
        <div
          ref={containerRef}
          className="relative w-full max-w-[1900px] overflow-hidden flex flex-wrap px-1"
          style= {{ lineHeight: "4rem", maxHeight: `${NUMBER_OF_LINES * 4 }rem` }}
          onMouseOver={handleFocus} 
          onFocus={handleFocus}
          tabIndex={1}
        >
          {  
            words.map((word: string, index: number) => {
              const isActiveWord = (index === activeInfo.word.idx);
              const inputWord = (index < inputWords.length) ? inputWords[index] : "";
              const spaceIsActive = (index === activeInfo.word.idx && word.length <= activeInfo.letter.idx);

              return (
                <span key={word + String(index)} className="block break-all">
                  <Word 
                    word={word} 
                    input={inputWord} 
                    active={isActiveWord} 
                    gameStatus={gameStatus}
                  />
                  <Space 
                    active={spaceIsActive} 
                    gameStatus={gameStatus}
                  />
                </span>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default TypewriterBox;