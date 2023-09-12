'use client';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { FC } from 'react';
import CreateTeamForm from './CreateTeamForm';
import { Modal, ModalContents, ModalOpenButton } from './GlobalModal/Modal';

interface CreateTeamButtonProps {
  children: React.ReactNode;
}

const CreateTeamButton: FC<CreateTeamButtonProps> = ({ children }) => {
  let size = useWindowSize();
  return (
    <Modal>
      <ModalOpenButton>{children}</ModalOpenButton>
      <ModalContents title="Create team" size={size} maxSize="sm">
        <CreateTeamForm />
      </ModalContents>
    </Modal>
  );
};

export default CreateTeamButton;
