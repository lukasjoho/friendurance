'use client';
import { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, useModal } from '.';

const InterceptionModal = ({ children }: any) => {
  const { show, hide, setIsActiveInterception } = useModal();
  useEffect(() => {
    setIsActiveInterception(true);
    return () => setIsActiveInterception(false);
  }, []);
  useEffect(() => {
    show(
      <Modal>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
        </ModalHeader>
        <ModalContent>Modal Content</ModalContent>
      </Modal>
    );
    return () => hide();
  }, []);
  return <></>;
};

export default InterceptionModal;
