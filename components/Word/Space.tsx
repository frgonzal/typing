import Letter from './Letter'

interface SpaceProps {
  active: boolean;
  gameStatus: symbol;
}


/**
 * Space component that renders a `Letter` component with a non-breaking space character.
 *
 * @param {boolean} active - Indicates if the space is currently active.
 * @param {symbol} gameStatus - The current status of the game.
 * @returns {React.ReactElement} The rendered `Letter` component with a non-breaking space character.
 */
const Space = ({active, gameStatus}: SpaceProps): React.ReactElement => {
  return (
    <Letter 
      letter="&nbsp;"
      input=" "
      active={active} 
      gameStatus={gameStatus}
    />
  );
}
export default Space;