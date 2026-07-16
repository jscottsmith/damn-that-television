import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";
import { type ReactNode } from "react";

import {
  Button,
  type ButtonProps,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

const buttonToggleIconVariants = cva("ml-1 shrink-0 rounded-full", {
  variants: {
    size: {
      sm: "size-4",
      base: "size-5",
      md: "size-6",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type ButtonToggleProps = Omit<ButtonProps, "variant"> & {
  isSelected: boolean;
  icon?: ReactNode;
  iconContainerClassName?: string;
};

function ButtonToggle({
  className,
  isSelected,
  size,
  icon,
  iconContainerClassName,
  children,
  ...props
}: ButtonToggleProps) {
  return (
    <Button
      data-slot="button-toggle"
      data-selected={isSelected}
      aria-pressed={isSelected}
      variant="secondary"
      size={size}
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[selected=true]:hocus:bg-accent/90 data-[selected=true]:shadow-hard-sm data-[selected=true]:-translate-x-1 data-[selected=true]:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
      <span
        className={cn(
          buttonToggleIconVariants({ size }),
          iconContainerClassName
        )}
      >
        {isSelected ? <CheckIcon /> : (icon ?? <XMarkIcon />)}
      </span>
    </Button>
  );
}

export { ButtonToggle };
export type { ButtonToggleProps };
