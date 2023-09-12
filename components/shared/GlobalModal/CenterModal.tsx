'use client';

import { motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { cn } from '@/lib/utils';

interface CenterModalProps {
  children: React.ReactNode;
  maxSize: 'xl' | 'lg' | 'md' | 'sm';
}

const CenterModal: FC<CenterModalProps> = ({ children, maxSize = 'md' }) => {
  const ref: any = useRef(null);
  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  let size = useWindowSize();
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    if (ref.current.clientHeight > size.height) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [size.height]);

  return (
    <motion.div
      ref={ref}
      id="body"
      className={cn(
        'relative mx-auto hidden max-h-[700px] min-h-[200px] w-full gap-4 place-self-center overflow-scroll rounded-lg border bg-background/80 p-6 pt-0 shadow-lg backdrop-blur-2xl  sm:rounded-lg md:block',
        isOverflowing && 'top-16',
        maxSize == 'xl' && 'max-w-5xl',
        maxSize == 'lg' && 'max-w-4xl',
        maxSize == 'md' && 'max-w-3xl',
        maxSize == 'sm' && 'max-w-[400px]'
      )}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {children}
    </motion.div>
  );
};

export default CenterModal;
