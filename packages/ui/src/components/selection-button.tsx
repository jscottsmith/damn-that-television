import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { cva } from "class-variance-authority"

import { Button, type ButtonProps } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

const selectionButtonVariants = cva("", {
  variants: {
    selected: {
      true: [
        "bg-club text-white",
        "shadow-hard-sm -translate-x-1 -translate-y-1",
        "hover:bg-club-600",
      ],
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
  },
})

type SelectionButtonProps = ButtonProps & {
  isSelected: boolean
}

function SelectionButton({
  className,
  isSelected,
  icon,
  iconContainerClassName,
  ...props
}: SelectionButtonProps) {
  return (
    <Button
      data-slot="selection-button"
      icon={isSelected ? <CheckIcon /> : icon ?? <XMarkIcon />}
      iconContainerClassName={cn(isSelected && "bg-club-700", iconContainerClassName)}
      className={cn(selectionButtonVariants({ selected: isSelected }), className)}
      {...props}
    />
  )
}

export { SelectionButton, selectionButtonVariants }
export type { SelectionButtonProps }
