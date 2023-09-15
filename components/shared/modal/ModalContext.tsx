import { createContext } from "react";

export const ModalContext = createContext<{
  show: (content: React.ReactNode) => void;
  hide: () => void;
  isOpen: boolean;
}>({
  show: () => {},
  hide: () => {},
  isOpen: false,
});
