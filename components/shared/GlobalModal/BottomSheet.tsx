'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

interface BottomSheetProps {
  children: React.ReactNode;
  size: any;
}

const BottomSheet: FC<BottomSheetProps> = ({ children, size }: any) => {
  const variants = {
    hidden: (h: any) => ({
      y: h,
    }),
    visible: {
      y: 0,
    },
  };
  return (
    <motion.div
      id="body"
      className={`absolute bottom-0 min-h-[200px] w-full max-w-[800px] rounded-lg border bg-background p-6 backdrop-blur-2xl`}
      style={{ maxHeight: size.height }}
      variants={variants}
      custom={size.height}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {children}
    </motion.div>
  );
};

export default BottomSheet;
