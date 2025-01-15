import Letter from './Letter'

interface SpaceProps {
  active: boolean;
  gameStatus: symbol;
}

function Space({active, gameStatus}: SpaceProps) {
  return (
    <Letter inputLetter=" " active={active} correctLetter=" " gameStatus={gameStatus}>
      &nbsp;
    </Letter>
  );
}
export default Space;