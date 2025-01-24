import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { GAME_STATUS } from "@/constants/game";


interface CursorProps {
  gameStatus: symbol;
}


/**
 * Cursor component that displays a blinking cursor based on the game status.
 *
 * @param {CursorProps} props - The properties for the Cursor component.
 * @param {symbol} props.gameStatus - The current status of the game.
 *
 * @returns {JSX.Element} The rendered Cursor component.
 *
 * The cursor will have different styles based on the game status:
 * - "animate-blink" when the game is waiting.
 * - No additional styles when the game is running.
 * - "hidden" when the game is in any other state.
 */
const Cursor = ({ gameStatus }: CursorProps): React.ReactElement => {
  const blinkMode = useMemo(() => {
    if (gameStatus === GAME_STATUS.WAITING)
      return "animate-blink";
    if (gameStatus === GAME_STATUS.RUNNING)
      return "";
    return "hidden";
  }, [gameStatus]);

  return (
    <motion.span 
      layoutId="cursor"
      transition={{
        duration: 0.11,
      }}
      className={`absolute left-[-15px] text-primary text-[2.8rem] ${blinkMode}`}
    >
      |
    </motion.span>
  );
}


export default Cursor;