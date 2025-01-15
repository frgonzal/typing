interface InputTypewriterProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputTypewriter({inputRef, onKeyDown}: InputTypewriterProps) {
  return (
    <input 
      className="absolute top-[-1000px] left-[-1000px]"
      ref={inputRef}
      onKeyDown={onKeyDown}
      autoFocus
      // tabIndex={0}
      >
    </input>
  );
}

export default InputTypewriter;