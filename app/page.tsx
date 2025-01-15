'use client';
import { useState } from 'react';
import Timer from '@/components/Progress/Timer';
import TimedTypewriter from '@/components/Typewriter/TimedTypewriter';
import { GAME_STATUS, INITIAL_TIME } from '@/constants/game';
import ReloadButton from '@/components/Navigation/ReloadButton';
import HandImg from '@/public/hand-index-thumb.svg'
// import Statistics from '@/components/Dashboard/Statistics';
import BlurredBackground from '@/components/Decorator/BlurredBackground';
import Image from 'next/image';



const Home = () => {
  const [status, setStatus] = useState(GAME_STATUS.WAITING);
  const [reload, setReload] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="flex flex-col items-center justify-center h-full mt-8 flex flex-col justify-center items-center"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="relative py-20 flex flex-col h-full w-full flex flex-col justify-center items-center">

        { !isFocused &&
          <BlurredBackground onClick={() => setIsFocused(true)}> 
            <div className="text-white text-3xl font-mono cursor-pointer flex items-center justify-center gap-8">
              <Image src={HandImg} alt="hand" width={50} className='-rotate-45'/>
              Click here to focus
            </div>
          </BlurredBackground>
        }

        <div className="absolute top-4 left-32">
          <Timer gameStatus={status} initialTime={INITIAL_TIME} notifyEnd={handleEnd}/>
        </div>
        <TimedTypewriter gameStatus={status} notifyStart={handleStart} reload={reload} />
      </div>

      <div className="mt-4">
        <ReloadButton onAction={handleRestart}/>
      </div>
    </div>
  )
}

export default Home;