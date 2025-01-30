'use client';
import { useState } from 'react';
import TimedTypewriter from '@/components/Typewriter/TimedTypewriter';
import ReloadButton from '@/components/Navigation/ReloadButton';
import useGameState from '@/hooks/useGameState';


const Home = () => {
  // const [status, setStatus] = useState(GAME_STATUS.WAITING);
  const gameState = useGameState();
  const [reload, setReload] = useState(0);

  const handleRestart = () => {
    gameState.reload();
    setReload(r => r + 1);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8 flex flex-col justify-center items-center">

      <div className="relative py-20 flex flex-col h-full w-full flex flex-col justify-center items-center">
        <TimedTypewriter gameState={gameState} reload={reload} />
      </div>

      <div className="mt-4">
        <ReloadButton onAction={handleRestart}/>
      </div>
    </div>
  )
}

export default Home;