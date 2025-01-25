import { KEYS } from "@/constants/game";

/**
 * Props for the InputTypewriter component.
 * 
 * @interface InputTypewriterProps
 * @property {React.RefObject<HTMLInputElement | null>} inputRef - A reference to the input element.
 * @property {(e: React.KeyboardEvent<HTMLInputElement>) => void} onKeyDown - Event handler for the key down event.
 * @property {() => void} onFocus - Event handler for the focus event.
 * @property {() => void} onBlur - Event handler for the blur event.
 */
interface InputTypewriterProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInput: (input: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}


/**
 * InputTypewriter component renders an invisible input field that captures keyboard events.
 * 
 * @param {InputTypewriterProps} props - The properties for the component.
 * @returns {React.ReactElement} The rendered input element.
 */
const InputTypewriter = ({inputRef, onInput, onFocus, onBlur}: InputTypewriterProps): React.ReactElement => {

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = (e.target as HTMLInputElement).value;
    switch (input) {
      case "":
        onInput(KEYS.BACKSPACE);
        break;
      case "  ":
        onInput(KEYS.SPACE);
        break;
      default:
        onInput(input.slice(-1));
        break;
    }
  };

  return (
    <input 
      className="absolute opacity-0"
      type="text"
      value={" "}
      ref={inputRef}
      // onKeyDown={onKeyDown}
      onInput={handleInput}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={-1}
      autoFocus
    >
    </input>
  );
}

export default InputTypewriter;