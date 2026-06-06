import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const buttonGroupVariants = cva("flex gap-0.5", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

type ButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants> & {
    vertical?: boolean
  }

function ButtonGroup({
  className,
  orientation,
  vertical,
  children,
  ...props
}: ButtonGroupProps) {
  const resolvedOrientation = vertical ? "vertical" : orientation

  return (
    <div
      data-slot="button-group"
      className={cn(buttonGroupVariants({ orientation: resolvedOrientation }), className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<{ className?: string }>(child)) {
          return child
        }

        return React.cloneElement(child, {
          className: cn(
            resolvedOrientation === "vertical"
              ? "[&:not(:last-child)]:rounded-b-none [&:not(:first-child)]:rounded-t-none"
              : "[&:not(:last-child)]:rounded-r-none [&:not(:first-child)]:rounded-l-none",
            child.props.className
          ),
        })
      })}
    </div>
  )
}

export { ButtonGroup, buttonGroupVariants }
