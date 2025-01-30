import { useEffect, useState } from "react";
import { GameState } from "@/types/state";

const BOX_X_PADDING = 1 * 4 * 2;

interface LinesRangeResult {
  firstWordIdx: number;
  lastWordIdx: number;
  isFull: boolean;
}

/**
 * Custom hook to calculate the range of visible words within a container element.
 *
 * @param {HTMLDivElement | null} container - The container element that holds the words.
 * @param {symbol} gameStatus - The current status of the game.
 * @param {number} reloadTrigger - A trigger value to recalculate the visible words.
 * @param {number} maxVisibleLines - The maximum number of visible lines in the container.
 * @returns {Object} An object containing:
 * - `firstWordIdx` {number} - The index of the first visible word.
 * - `lastWordIdx` {number} - The index of the last visible word.
 * - `isFull` {boolean} - A flag indicating if the container is full.
 */
const useLinesRange = (container: HTMLDivElement | null, gameState: GameState, reloadTrigger: number, maxVisibleLines: number): LinesRangeResult => {
  const [firstWordIdx, setFirstWordIdx] = useState(0);
  const [lastWordIdx, setLastWordIdx] = useState(0);
  const [isFull, setIsFull] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

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
    window.addEventListener("resize", calculateVisibleWords, { signal });
    window.addEventListener("scroll", calculateVisibleWords, { signal });

    return () => controller.abort();
  }, [container, gameState, reloadTrigger, maxVisibleLines]);

  return { 
    firstWordIdx, 
    lastWordIdx, 
    isFull,
  };
};


export default useLinesRange;