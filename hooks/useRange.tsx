// import { line } from "framer-motion/client";
import { useEffect, useState } from "react";

const useRange = (ref: React.RefObject<HTMLDivElement | null>, gameStatus: symbol, activeWordIdx: number, maxVisibleLines: number) => {
  const [firstWordIdx, setFirstWordIdx] = useState(0);
  const [lastWordIdx, setLastWordIdx] = useState(0);
  const [isFull, setIsFull] = useState(true);


  useEffect(() => {
    const calculateVisibleWords = () => {
      const container = ref.current;
      if (!container)
        return;

      const containerWidth = container.clientWidth - 128 * 2;

      // const lineHeight = parseFloat(getComputedStyle(container).lineHeight);
      // const maxVisibleLines = Math.floor(containerHeight / lineHeight);
      // const containerHeight = lineHeight * maxVisibleLines;

      let currentWidth = 0;
      let currentLine = 1;
      let lastWord = 0;
      let firstWord = 0;
      let totalWords = 0;

      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i] as HTMLElement;
        const wordWidth = child.clientWidth;

        if (currentWidth + wordWidth > containerWidth && currentLine == maxVisibleLines) {
          console.log("break", currentLine, currentWidth, wordWidth, containerWidth);
          break;
        }

        if (currentWidth + wordWidth <= containerWidth) {
          currentWidth += wordWidth;
        } else {
          currentWidth = wordWidth;
          currentLine++;
        }
        if (currentLine <= 2) {
          lastWord++;
        }
        if (currentLine <= 1) {
          firstWord++;
        }
        totalWords++;

      };
      console.log(currentLine)
      
      setFirstWordIdx(firstWord - 1);
      setLastWordIdx(lastWord - 1);

      if (currentLine === maxVisibleLines) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    };

    calculateVisibleWords();
    window.addEventListener("resize", calculateVisibleWords);

    return () => {
      window.removeEventListener("resize", calculateVisibleWords);
    }
  }, [ref, gameStatus, activeWordIdx, maxVisibleLines]);

  return { firstWordIdx, lastWordIdx, isFull };
};


export default useRange;