'use client';
import { useState } from 'react';
import Timer from '@/components/Progress/Timer';
import TimedTypewriter from '@/components/Typewriter/TimedTypewriter';
import ArrowClockwiseImg from '@/public/arrow-clockwise.svg'
import Image from 'next/image';
import { GAME_STATUS, INITIAL_TIME } from '@/constants/game';



const Home = () => {
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

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen mt-8">
      <div className="relative p-4 flex flex-col border-green-500 border-2">
        <Timer gameStatus={status} initialTime={INITIAL_TIME} notifyEnd={handleEnd}/>
        <TimedTypewriter gameStatus={status} notifyStart={handleStart}/>
      </div>

      <div className="mt-8" onClick={handleRestart} onKeyDown={handleRestart}>
        <Image 
          src={ArrowClockwiseImg} 
          alt="Restart" 
          width={40}
          className="cursor-pointer"
          tabIndex={0}
          />
      </div>
    </div>
  )
}

export default Home;
export { GAME_STATUS };
