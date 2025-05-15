interface OverlayProps {
  isOpen: boolean
  onClose: () => void
}

const Overlay = ({ isOpen, onClose }: OverlayProps) => {
  if (!isOpen) return null
  
  return (
    <div 
      className="fixed inset-0 bg-black/30 z-30"
      onClick={onClose}
    />
  )
}

export default Overlay