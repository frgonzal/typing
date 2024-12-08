import { useState } from "react";
import { useEffect } from "react";
import { GAME_STATUS } from "../Game/Game"

interface TimerProps {
  gameStatus: string,
  initialTime: number;
  notifyEnd: () => void;
}

function Timer({gameStatus, initialTime, notifyEnd}: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const displayMode = 
      (gameStatus === GAME_STATUS.RUNNING) ?
      "block" : "none";

  useEffect(() => {
    if (gameStatus === GAME_STATUS.WAITING) {
      setTime(initialTime);
      return;
    }

    if (gameStatus === GAME_STATUS.ENDED) {
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime === 0)
          return 0;
        if (prevTime === 1) {
          setTimeout(() => notifyEnd(), 0);
          return 0;
        }
        return prevTime - 1;
      })
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return (
    <h3 className="text-warning" style={{display: displayMode}}>{time}</h3>
  );
}

export default Timer;