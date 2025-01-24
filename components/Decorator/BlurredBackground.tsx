/**
 * Props for the BlurredBackground component.
 * 
 * @interface BlurredBackgroundProps
 * @property {React.ReactNode} [children] - The content to be displayed inside the blurred background.
 * @property {() => void} [onClick] - Optional click handler for the background.
 */
interface BlurredBackgroundProps {
  children?: React.ReactNode;
  onClick?: () => void;
}


/**
 * A component that renders a blurred background overlay.
 * 
 * @param {BlurredBackgroundProps} props - The props for the component.
 * @param {() => void} [props.onClick] - Optional click handler for the background.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the blurred background.
 * 
 * @returns {JSX.Element} The rendered blurred background component.
 */
const BlurredBackground = ({ onClick, children }: BlurredBackgroundProps): React.ReactElement => {
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