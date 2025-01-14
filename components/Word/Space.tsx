import Letter from './Letter'

interface SpaceProps {
  active: boolean;
}

function Space({active}: SpaceProps) {
  return (
    <Letter inputLetter=" " active={active} correctLetter=" ">
      &nbsp;
    </Letter>
  );
}
export default Space;