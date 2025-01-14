import Image from 'next/image';
import ArrowClockwiseImg from '@/public/arrow-clockwise.svg'


interface ReloadButtonProps {
  onAction: () => void;
}


const ReloadButton = ({ onAction }: ReloadButtonProps) => {
  return (
    <Image 
      src={ArrowClockwiseImg} 
      alt="Restart" 
      width={40}
      className="cursor-pointer"
      onClick={onAction}
      onKeyDown={onAction}
      tabIndex={0}
    />
  );
}


export default ReloadButton;