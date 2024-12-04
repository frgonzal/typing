import './styles.css'

interface SpaceProps {
  active: boolean;
}

function Space({active}: SpaceProps) {
  return (
    <span className={`font-monospace space ${active && "active" }`}> </span>
  );
}

export default Space;