import { useState } from 'react';
import Timer from '../Timer';
import Typewriter from '../Typewriter';

const INITIAL_TIME = 30;

function Game() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const handleStart = () => {
    if (!hasStarted){
      setHasStarted(true);
    }
  }
  const handleEnd = () => {
    if (!hasEnded) {
      setHasEnded(true);
    }
  }

  return (
    <div className="container mt-5 d-flex flex-row align-items-top" style={{border: "solid 1px red"}}>
      <div className="col-1 mt-5" style={{border: "solid 1px red"}}>
        <Timer hasStarted={hasStarted} initialTime={INITIAL_TIME} notifyEnd={handleEnd}/>
      </div>
      <div className="container mt-5 d-flex flex-row justify-content-center" style={{border: "solid 1px red"}}>
        <Typewriter hasEnded={hasEnded} notifyStart={handleStart}/>
      </div> 
    </div>
  )
}

export default Game;