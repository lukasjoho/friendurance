'use client';

import { useWindowSize } from '@/lib/hooks/useWindowSize';
import {
  Modal,
  ModalContents,
  ModalOpenButton,
} from './shared/GlobalModal/Modal';
import { Button } from './ui/button';

const TestModal = () => {
  let size = useWindowSize();
  return (
    <Modal>
      <ModalOpenButton>
        <button>Open Modal</button>
      </ModalOpenButton>
      <ModalContents title="Test Modal" size={size}>
        <div>
          <p>Hello, there!</p>
          <p>Please continue.</p>
          <Button>Continue</Button>
        </div>
      </ModalContents>
    </Modal>
  );
};

export default TestModal;
