interface InputTypewriterProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function InputTypewriter({inputRef, onKeyDown, onFocus, onBlur}: InputTypewriterProps) {
  return (
    <input 
      className="absolute top-[-1000px] left-[-1000px]"
      ref={inputRef}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus
    >
    </input>
  );
}

export default InputTypewriter;