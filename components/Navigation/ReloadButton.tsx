import Image from 'next/image';
import ArrowClockwiseImg from '@/public/arrow-clockwise.svg'


interface ReloadButtonProps {
  onAction: () => void;
}


/**
 * ReloadButton component renders an image that acts as a button to trigger a reload action.
 * 
 * @component
 * @param {ReloadButtonProps} props - The properties for the ReloadButton component.
 * @param {() => void} props.onAction - The function to be called when the button is clicked or activated via keyboard.
 * 
 * @example
 * <ReloadButton onAction={handleReload} />
 * 
 * @returns {JSX.Element} The rendered ReloadButton component.
 */
const ReloadButton = ({ onAction }: ReloadButtonProps): React.ReactElement => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      onAction();
    }
  }

  return (
    <Image 
      src={ArrowClockwiseImg} 
      alt="Restart" 
      width={40}
      height={40}
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:rounded-md"
      onClick={onAction}
      onKeyDown={handleKeyDown}
      tabIndex={1}
    />
  );
}


export default ReloadButton;