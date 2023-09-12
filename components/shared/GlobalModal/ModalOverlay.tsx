import { motion } from 'framer-motion';
import { FC } from 'react';

interface ModalOverlayProps {
  handleModalBackgroundClick: (e: any) => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({
  handleModalBackgroundClick,
}: any) => {
  return (
    <motion.div
      className="fixed left-0 top-0 h-screen w-screen bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      exit={{
        opacity: 0,
      }}
      onClick={(e: any) => handleModalBackgroundClick(e)}
    />
  );
};

export default ModalOverlay;
