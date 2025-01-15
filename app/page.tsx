'use client';
import { useState } from 'react';
import Timer from '@/components/Progress/Timer';
import TimedTypewriter from '@/components/Typewriter/TimedTypewriter';
import { GAME_STATUS, INITIAL_TIME } from '@/constants/game';
import ReloadButton from '@/components/Navigation/ReloadButton';
// import Statistics from '@/components/Dashboard/Statistics';



const Home = () => {
  const [status, setStatus] = useState(GAME_STATUS.WAITING);
  const [reload, setReload] = useState(0);

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
    setReload(reload + 1);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <div className="relative pt-16 px-16 flex flex-col h-full w-full">

        <div className="absolute top-0 left-[13rem]">
          <Timer gameStatus={status} initialTime={INITIAL_TIME} notifyEnd={handleEnd}/>
        </div>
        <TimedTypewriter gameStatus={status} notifyStart={handleStart} reload={reload}/>
{/* 
        <div className="z-20 absolute top-0 left-0 w-full h-full pt-16 px-16 flex backdrop-filter backdrop-blur-lg">
          <Statistics/>
        </div> */}
      </div>

      <div className="mt-8">
        <ReloadButton onAction={handleRestart}/>
      </div>
    </div>
  )
}

export default Home;