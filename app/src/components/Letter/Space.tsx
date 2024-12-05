import '../Word/styles.css'
import './styles.css'

interface SpaceProps {
  active: boolean;
}

function Space({active}: SpaceProps) {
  return (
    <span className={`word font-monospace space ${active && "active" }`}>
      &nbsp;
    </span>
  );
}

export default Space;