import Image from 'next/image';
import ArrowClockwiseImg from '@/public/arrow-clockwise.svg'


interface ReloadButtonProps {
  onAction: () => void;
}


const ReloadButton = ({ onAction }: ReloadButtonProps) => {
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
      className="cursor-pointer"
      onClick={onAction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    />
  );
}


export default ReloadButton;