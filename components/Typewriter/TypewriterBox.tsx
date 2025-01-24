import Word from "@/components/Word/Word";
import Space from "@/components/Word/Space";
import TypewriterInput from "@/components/Input/TypewriterInput";
import { useRef, useState } from "react";
import HandImg from '@/public/hand-index-thumb.svg'
import BlurredBackground from '@/components/Decorator/BlurredBackground';
import Image from 'next/image';
import { ActiveInfo } from "@/types/status";
import { NUMBER_OF_LINES } from "@/constants/typewriter";


/**
 * TypewriterBox component props interface.
 * 
 * @interface TypewriterProps
 * @property {string[]} words - Array of words to be displayed in the typewriter.
 * @property {string[]} inputWords - Array of words input by the user.
 * @property {React.RefObject<HTMLDivElement | null>} containerRef - Reference to the container div element.
 * @property {symbol} gameStatus - Current status of the game.
 * @property {ActiveInfo} activeInfo - Information about the currently active word and letter.
 * @property {(e: React.KeyboardEvent<HTMLInputElement>) => void} handleInput - Function to handle input events.
 */
interface TypewriterProps {
  words: string[];
  inputWords: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  gameStatus: symbol;
  activeInfo: ActiveInfo;
  handleInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


/**
 * TypewriterBox component.
 * 
 * This component renders a typewriter interface with words to be typed, an input field, and a blurred background
 * that prompts the user to click to focus. It manages focus and blur events to control the visibility of the blurred
 * background and the focus state of the input field.
 * 
 * @param {TypewriterProps} props - The props for the TypewriterBox component.
 * @returns {JSX.Element} The rendered TypewriterBox component.
 */
const TypewriterBox = ({ words, inputWords, containerRef, gameStatus, activeInfo, handleInput }: TypewriterProps): React.ReactElement => {
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
    <div className="relative w-full">
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

      <div className="px-16 flex justify-center items-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-[1500px] overflow-hidden flex flex-wrap px-1 focus:outline-none"
          style= {{ lineHeight: "4rem", maxHeight: `${NUMBER_OF_LINES * 4 }rem` }}
          onMouseOver={handleFocus} 
          onFocus={handleFocus}
          tabIndex={-1}
        >
          {  
            words.map((word: string, index: number) => {
              const isActiveWord = (index === activeInfo.word.idx);
              const inputWord = (index < inputWords.length) ? inputWords[index] : "";
              const spaceIsActive = (index === activeInfo.word.idx && word.length <= activeInfo.letter.idx);

              return (
                <span key={word + String(index)} className="block">
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
    </div>
  );
};

export default TypewriterBox;