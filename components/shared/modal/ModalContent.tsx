interface ModalContentProps {
  children: React.ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return (
    <div
      className="shrink overflow-scroll px-4 py-4 md:px-6 md:py-6"
      id="modal-content"
    >
      {children}
    </div>
  );
}
