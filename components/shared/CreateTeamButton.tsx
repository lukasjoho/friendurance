'use client';

import { Button } from '../ui/button';
import CreateTeamForm from './CreateTeamForm';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  useModal,
} from './modal';

export default function CreateTeamModal() {
  const { show } = useModal();
  return (
    <>
      <Button
        className="w-full"
        onClick={() =>
          show(
            <Modal>
              <ModalHeader>
                <ModalTitle>Create team</ModalTitle>
              </ModalHeader>
              <ModalContent>
                <CreateTeamForm />
              </ModalContent>
            </Modal>
          )
        }
      >
        Create team
      </Button>
    </>
  );
}
