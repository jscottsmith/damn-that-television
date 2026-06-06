import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";
import * as React from "react";

import { Button, type ButtonProps } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

const selectionButtonIconVariants = cva("ml-1 shrink-0 rounded-full", {
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

type SelectionButtonProps = ButtonProps & {
  isSelected: boolean;
  icon?: React.ReactNode;
  iconContainerClassName?: string;
};

function SelectionButton({
  className,
  isSelected,
  size,
  variant = "selection",
  icon,
  iconContainerClassName,
  children,
  ...props
}: SelectionButtonProps) {
  return (
    <Button
      data-slot="selection-button"
      data-selected={isSelected}
      variant={variant}
      className={className}
      size={size}
      {...props}
    >
      {children}
      <span
        className={cn(
          selectionButtonIconVariants({ size }),
          iconContainerClassName
        )}
      >
        {isSelected ? <CheckIcon /> : (icon ?? <XMarkIcon />)}
      </span>
    </Button>
  );
}

export { SelectionButton };
export type { SelectionButtonProps };
