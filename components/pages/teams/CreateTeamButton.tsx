'use client';

import CreateTeamForm from '../../shared/CreateTeamForm';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  useModal,
} from '../../shared/modal';
import { Button } from '../../ui/button';

export default function CreateTeamButton() {
  const { show, hide } = useModal();
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
                <CreateTeamForm hide={hide} />
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
