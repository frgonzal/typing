import { useState } from "react";
import { useEffect } from "react";

interface TimerProps {
  hasStarted: boolean;
  stopTimer: () => void;
  initialTime?: number;
}

function Timer({hasStarted, stopTimer, initialTime = 30}: TimerProps) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (!hasStarted) {
          return initialTime;
        }

        if (prevTime <= 1) {
          stopTimer?.();
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      })
    }, 1000);
    return () => clearInterval(intervalId);
  }, [stopTimer]);

  return (
    <h3 className="text-warning">{time}</h3>
  );
}

export default Timer;