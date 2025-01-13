import Letter from './Letter'

interface SpaceProps {
  active: boolean;
}

function Space({active}: SpaceProps) {
  return (
    <Letter inputLetter=" " active={active}>
      &nbsp;
    </Letter>
  );
}
export default Space;