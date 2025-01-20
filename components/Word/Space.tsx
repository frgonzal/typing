import Letter from './Letter'

interface SpaceProps {
  active: boolean;
  gameStatus: symbol;
}

function Space({active, gameStatus}: SpaceProps) {
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