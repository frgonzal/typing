import Letter from './Letter'
import { GameState } from '@/types/state';

interface SpaceProps {
  active: boolean;
  gameState: GameState;
}


/**
 * Space component that renders a `Letter` component with a non-breaking space character.
 *
 * @param {boolean} active - Indicates if the space is currently active.
 * @param {symbol} gameStatus - The current status of the game.
 * @returns {React.ReactElement} The rendered `Letter` component with a non-breaking space character.
 */
const Space = ({active, gameState}: SpaceProps): React.ReactElement => {
  return (
    <Letter 
      letter="&nbsp;"
      input=" "
      active={active} 
      gameState={gameState}
    />
  );
}
export default Space;