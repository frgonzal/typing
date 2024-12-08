interface InputTypewriterProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputTypewriter({inputRef, onKeyDown}: InputTypewriterProps) {
  return (
    <input 
      id="input-typewriter" 
      ref={inputRef}
      onKeyDown={onKeyDown}
      autoFocus>
    </input>
  );
}

export default InputTypewriter;