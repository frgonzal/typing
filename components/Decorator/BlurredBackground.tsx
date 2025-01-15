
interface BlurredBackgroundProps {
  children?: React.ReactNode;
  onClick?: () => void;
}


const BlurredBackground = ({ onClick, children }: BlurredBackgroundProps) => {
  return (
    <div 
      className="absolute inset-0 z-20 w-full h-full left-0 top-0 backdrop-filter backdrop-blur-lg flex items-center justify-center" 
      onClick={onClick}
    >
      {children}
    </div>
  )
}


export default BlurredBackground;