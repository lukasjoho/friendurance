import { forwardRef, useContext } from "react";
import { ModalContext } from "./ModalContext";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { hide } = useContext(ModalContext);
  return (
    <Button
      ref={ref}
      className={cn("z-10 p-0.5 h-auto", className)}
      variant="ghost"
      onClick={() => hide()}
      {...props}
    >
      <X className="w-4 h-4" />
    </Button>
  );
});
