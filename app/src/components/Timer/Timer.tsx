import { useState } from "react";
import { useEffect } from "react";

interface TimerProps {
  hasStarted: boolean;
  initialTime: number;
  notifyEnd: () => void;
}

function Timer({hasStarted, initialTime, notifyEnd}: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const displayMode = hasStarted ? "block" : "none";

  useEffect(() => {
    if (!hasStarted) return;

    const intervalId = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setTimeout(() => notifyEnd(), 0);
          return 0;
        }
        return prevTime - 1;
      })
    }, 1000);
    return () => clearInterval(intervalId);
  }, [hasStarted]);

  return (
    <h3 className="text-warning" style={{display: displayMode}}>{time}</h3>
  );
}

export default Timer;