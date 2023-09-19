'use client';

interface ModalProps {
  children: React.ReactNode;
  id?: string;
}

export function Modal({ children, id }: ModalProps) {
  return (
    <div className="flex flex-col justify-between bg-background">
      {children}
    </div>
  );
}
