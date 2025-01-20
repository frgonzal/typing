import { useMemo } from "react";
import { motion } from "framer-motion";
import { GAME_STATUS } from "@/constants/game";


interface CursorProps {
  gameStatus: symbol;
}


const Cursor = ({ gameStatus }: CursorProps) => {
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