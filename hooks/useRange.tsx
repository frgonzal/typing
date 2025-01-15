import { useEffect, useState } from "react";

const useRange = (containerRef: React.RefObject<HTMLDivElement | null>, gameStatus: symbol, activeWordIdx: number, lastLineForInput: number = 2, linesAbove: number = 1) => {
  const [firstWordIdx, setFirstWordIdx] = useState(0);
  const [lastWordIdx, setLastWordIdx] = useState(0);
  const [isFull, setIsFull] = useState(true);

  useEffect(() => {
    const calculateVisibleWords = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      };

      const containerHeight = container.clientHeight || 0;
      const containerWidth = container.clientWidth - 128 * 2;

      const lineHeight = parseFloat(getComputedStyle(container).lineHeight);
      const maxVisibleLines = Math.floor(containerHeight / lineHeight);

      let currentWidth = 0;
      let currentLine = 1;
      let lastWord = 0;
      let firstWord = 0;
      let totalWords = 0;

      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i] as HTMLElement;
        const wordWidth = child.clientWidth;

        if (currentWidth + wordWidth > containerWidth && currentLine == maxVisibleLines) {
          break;
        }

        if (currentWidth + wordWidth <= containerWidth) {
          currentWidth += wordWidth;
        } else {
          currentWidth = wordWidth;
          currentLine++;
        }
        if (currentLine <= lastLineForInput) {
          lastWord++;
        }
        if (currentLine <= linesAbove ) {
          firstWord++;
        }
        totalWords++;
      };

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
  }, [containerRef, gameStatus, activeWordIdx, lastLineForInput, linesAbove]);

  return { firstWordIdx, lastWordIdx, isFull, containerRef };
};


export default useRange;