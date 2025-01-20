import { useState, useEffect, useRef } from "react";
import { GAME_STATUS } from "@/constants/game";

interface TimerProps {
  gameStatus: symbol,
  initialTime: number;
  handleEnd: () => void;
}

function Timer({gameStatus, initialTime, handleEnd}: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.WAITING) {
      setTime(initialTime);
      return;
    }

    if (gameStatus !== GAME_STATUS.RUNNING)
      return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime === 0)
          return 0;
        if (prevTime === 1) {
          setTimeout(() => handleEnd(), 0);
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
  }, [gameStatus, initialTime, handleEnd]);

  return (
    <div className={`flex text-4xl text-primary`}>
      {time}
    </div>
  );
}

export default Timer;