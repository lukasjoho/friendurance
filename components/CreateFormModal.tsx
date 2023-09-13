'use client';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import CreateTeamForm from './shared/CreateTeamForm';
import { ModalContents } from './shared/GlobalModal/Modal';

const CreateFormModal = () => {
  let size = useWindowSize();
  return (
    <ModalContents title="Create team" size={size} maxSize="sm">
      <CreateTeamForm />
    </ModalContents>
  );
};

export default CreateFormModal;
