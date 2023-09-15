import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const ModalTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight pointer-events-none",
      className
    )}
    {...props}
  />
));
