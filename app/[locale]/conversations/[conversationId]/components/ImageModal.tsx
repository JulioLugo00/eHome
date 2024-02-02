'use client';

import ChatModal from '@/app/[locale]/components/modals/ChatModal';
import Image from 'next/image';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  src
}) => {
  if (!src) {
    return null;
  }

  return (
    <ChatModal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image 
          className="object-cover" 
          fill 
          alt="Image" 
          src={src}
        />
      </div>
    </ChatModal>
  )
}

export default ImageModal;