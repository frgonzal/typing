'use client';
import { useState } from 'react';
import TimedTypewriter from '@/components/Typewriter/TimedTypewriter';
import { GAME_STATUS } from '@/constants/game';
import ReloadButton from '@/components/Navigation/ReloadButton';


const Home = () => {
  const [status, setStatus] = useState(GAME_STATUS.WAITING);
  const [reload, setReload] = useState(0);

  const handleRestart = () => {
    setStatus(GAME_STATUS.WAITING);
    setReload(r => r + 1);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8 flex flex-col justify-center items-center">

      <div className="relative py-20 flex flex-col h-full w-full flex flex-col justify-center items-center">
        <TimedTypewriter gameStatus={status} setGameStatus={setStatus} reload={reload} />
      </div>

      <div className="mt-4">
        <ReloadButton onAction={handleRestart}/>
      </div>
    </div>
  )
}

export default Home;