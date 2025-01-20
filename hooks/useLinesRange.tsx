import { useEffect, useState } from "react";

const BOX_X_PADDING = 1 * 4 * 2;


const useLinesRange = (container: HTMLDivElement | null, gameStatus: symbol, activeWordIdx: number, maxVisibleLines: number) => {
  const [firstWordIdx, setFirstWordIdx] = useState(0);
  const [lastWordIdx, setLastWordIdx] = useState(0);
  const [isFull, setIsFull] = useState(true);
  // const [triggerLoad, setTriggerLoad] = useState(0);

  useEffect(() => {
    const calculateVisibleWords = () => {
      if (!container)
        return;

      const containerWidth = container.clientWidth - BOX_X_PADDING;

      let currentWidth = 0;
      let currentLine = 1;
      let lastWord = 0;
      let firstWord = 0;
      let totalWords = 0;

      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i] as HTMLElement;
        const wordWidth = child.clientWidth;

        if (currentWidth + wordWidth > containerWidth && currentLine === maxVisibleLines + 1) {
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

      setFirstWordIdx(firstWord - 1);
      setLastWordIdx(lastWord - 1);

      if (currentLine === maxVisibleLines + 1) {
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
  }, [container, gameStatus, activeWordIdx, maxVisibleLines]);

  return { firstWordIdx, lastWordIdx, isFull };
};


export default useLinesRange;