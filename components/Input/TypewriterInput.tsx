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
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}


/**
 * InputTypewriter component renders an invisible input field that captures keyboard events.
 * 
 * @param {InputTypewriterProps} props - The properties for the component.
 * @returns {React.ReactElement} The rendered input element.
 */
const InputTypewriter = ({inputRef, onKeyDown, onFocus, onBlur}: InputTypewriterProps): React.ReactElement => {

  return (
    <input 
      className="absolute opacity-0"
      type="text"
      ref={inputRef}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={-1}
      autoFocus
    >
    </input>
  );
}

export default InputTypewriter;