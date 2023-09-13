'use client';

import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { FC } from 'react';

import { CardTitle } from '@/components/ui/card';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { cn } from '@/lib/utils';
import BottomSheet from './BottomSheet';
import CenterModal from './CenterModal';
import ModalOverlay from './ModalOverlay';
import useFixBackground from './hooks/useFixBackground';

export const ModalContext = React.createContext([
  false,
  (arg: any) => {
    return arg;
  },
]);

const callAll =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn && fn(...args));

function Modal(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }: any) {
  const [setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    //@ts-ignore/
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child, blockModalTrigger }: any) {
  const [, setIsOpen]: any = React.useContext(ModalContext);

  return React.cloneElement(child, {
    //@ts-ignore/
    onClick: callAll(() => {
      // You now have access to `window`
      if (blockModalTrigger) {
        return;
      }
      //@ts-ignore
      setIsOpen(true);
    }, child.props.onClick),
  });
}

interface ModalContentsProps {
  title?: string;
  children: React.ReactNode[];
  maxSize?: string;
  [x: string]: any;
}

function ModalContents({
  title,
  children: child,
  maxSize,
  test,
  ...props
}: any) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  useFixBackground(isOpen);

  const handleClose = () => {
    //@ts-ignore
    setIsOpen(false);
  };
  const handleModalBackgroundClick = (e: any) => {
    handleClose();
    e.preventDefault();
  };

  const size = useWindowSize();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            'fixed left-0 top-0 z-50 grid w-screen',
            test && 'bg-green-500'
          )}
          style={{ height: '100dvh' }}
        >
          <ModalOverlay
            handleModalBackgroundClick={handleModalBackgroundClick}
          />
          <ModalBody size={size} maxSize={maxSize} test={test}>
            <ModalHeader title={title} handleClose={handleClose} />
            {React.cloneElement(child, {
              handleClose: handleClose,
            })}
          </ModalBody>
        </div>
      )}
    </AnimatePresence>
  );
}
interface ModalOpenProps {
  title: string;
  handleClose: () => void;
}
const ModalHeader: FC<ModalOpenProps> = ({ title, handleClose }) => {
  return (
    <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-background pb-6 md:pt-6">
      <CardTitle>{title}</CardTitle>
      <div
        onClick={() => handleClose()}
        className="cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </div>
    </div>
  );
};

const ModalFooter = ({ children }: any) => {
  return (
    <div className="absolute bottom-0 z-10 flex items-center justify-between gap-4 bg-background py-6">
      {children}
    </div>
  );
};

const ModalBody = ({ children, size, maxSize }: any) => {
  return (
    <>
      <div className="hidden md:grid ">
        <CenterModal maxSize={maxSize}>{children}</CenterModal>
      </div>
      <div className="w-full md:hidden">
        <BottomSheet size={size}>{children}</BottomSheet>
      </div>
    </>
  );
};

export { Modal, ModalContents, ModalDismissButton, ModalOpenButton };
