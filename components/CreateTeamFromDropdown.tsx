'use client';
import { PlusCircle } from 'lucide-react';
import CreateTeamForm from './shared/CreateTeamForm';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  useModal,
} from './shared/modal';
import { DropdownMenuItem } from './ui/dropdown-menu';

const CreateTeamFromDropdown = () => {
  const { show } = useModal();
  return (
    <DropdownMenuItem
      className="cursor-pointer"
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
      <div className="flex items-center gap-2">
        <div className="flex w-5 justify-center">
          <PlusCircle className="h-4 w-4" />
        </div>
        <span>Create team</span>
      </div>
    </DropdownMenuItem>
  );
};

export default CreateTeamFromDropdown;
