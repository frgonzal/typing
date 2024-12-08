import { useState } from 'react';
import Timer from '../Timer';
import Typewriter from '../Typewriter';

const INITIAL_TIME = 30;

const GAME_STATUS = {
  WAITING: "waiting",
  RUNNING: "running",
  ENDED: "ended",
}

const Game = () => {
  const [status, setStatus] = useState(GAME_STATUS.WAITING);

  const handleStart = () => {
    if (status === GAME_STATUS.WAITING) {
      setStatus(GAME_STATUS.RUNNING);
    }
  }

  const handleEnd = () => {
    if (status === GAME_STATUS.RUNNING) {
      setStatus(GAME_STATUS.ENDED);
    }
  }

  const handleRestart = () => {
    setStatus(GAME_STATUS.WAITING);
  }

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleRestart();
    }
  }

  return (
    <>
      <div className="container mt-5 d-flex flex-row align-items-top">
        <div className="col-1 mt-5" style={{border: "solid 1px red"}}>
          <Timer gameStatus={status} initialTime={INITIAL_TIME} notifyEnd={handleEnd}/>
        </div>
        <div 
          className="container mt-5 d-flex flex-row justify-content-center" 
          style={{border: "solid 1px red"}}
          onKeyUp={handleKeyEvent}>
          <Typewriter gameStatus={status} notifyStart={handleStart}/>
        </div> 
      </div>

      <div className="pt-4" onClick={handleRestart} style={{cursor: "pointer"}}>
        <i className="bi bi-arrow-clockwise"></i>
      </div>
    </>
  )
}

export default Game;
export { GAME_STATUS };