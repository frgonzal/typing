export type GameState = {
  isWaiting: boolean;
  isRunning: boolean;
  isPaused: boolean;
  hasEnded: boolean;

  start(): void;
  pause(): void;
  resume(): void;
  reload(): void;
  end(): void;
}