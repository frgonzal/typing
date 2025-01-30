import { useState } from 'react';
import { GameState } from '@/types/state';

enum GameStates {
  WAITING = 'waiting',
  RUNNING = 'running',
  PAUSED = 'paused',
  ENDED = 'ended',
}


const useGameState = (): GameState => {
  const [gameState, setGameState] = useState(GameStates.WAITING);

  const isWaiting = gameState === GameStates.WAITING;
  const isRunning = gameState === GameStates.RUNNING;
  const isPaused = gameState === GameStates.PAUSED;
  const hasEnded = gameState === GameStates.ENDED;

  const start = () => setGameState(GameStates.RUNNING);
  const pause = () => setGameState(GameStates.PAUSED);
  const resume = () => setGameState(GameStates.RUNNING);
  const reload = () => setGameState(GameStates.WAITING);
  const end = () => setGameState(GameStates.ENDED);


  return {
    isWaiting,
    isRunning,
    isPaused,
    hasEnded,

    start,
    pause,
    resume,
    reload,
    end,
  }
}


export default useGameState;