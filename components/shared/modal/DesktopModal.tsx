import { motion } from "framer-motion";

interface DesktopModalProps {
  children: React.ReactNode;
}

export function DesktopModal({ children }: DesktopModalProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative border rounded-lg min-w-[300px] max-h-[90%] overflow-scroll shadow-md max-w-[720px] self-center mx-auto"
    >
      {children}
    </motion.div>
  );
}
