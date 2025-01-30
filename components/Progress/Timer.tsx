import { useState, useEffect, useRef } from "react";
// import { GAME_STATUS } from "@/constants/game";
import { GameState } from "@/types/state";


interface TimerProps {
  gameState: GameState,
  initialTime: number;
  // handleEnd: () => void;
}


/**
 * Timer component that displays a countdown timer.
 *
 * @param {TimerProps} props - The properties for the Timer component.
 * @param {symbol} props.gameStatus - The current status of the game.
 * @param {number} props.initialTime - The initial time to start the countdown from.
 * @param {() => void} props.handleEnd - The callback function to be called when the timer ends.
 *
 * @returns {React.ReactElement} The Timer component.
 *
 * @example
 * <Timer
 *   gameStatus={GAME_STATUS.RUNNING}
 *   initialTime={60}
 *   handleEnd={() => console.log('Timer ended')}
 * />
 */
const Timer = ({gameState, initialTime }: TimerProps): React.ReactElement => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState.isWaiting) {
      setTime(initialTime);
      return;
    }

    if (!gameState.isRunning)
      return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime === 0)
          return 0;
        if (prevTime === 1) {
          setTimeout(() => gameState.end(), 0);
          return 0;
        }
        return prevTime - 1;
      })
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [gameState, initialTime]);

  return (
    <div className={`flex text-4xl text-primary`}>
      {time}
    </div>
  );
}

export default Timer;