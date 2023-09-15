import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalPortal } from './ModalPortal';
import useFixBackground from './hooks/useFixBackground';

interface ModalProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const show = (content: React.ReactNode) => {
    console.log('show');
    setModalContent(content);
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
    setModalContent(false);
  };
  useFixBackground(isOpen);

  return (
    <ModalContext.Provider value={{ show, hide, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && <ModalPortal>{modalContent}</ModalPortal>}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
