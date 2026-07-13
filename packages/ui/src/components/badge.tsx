import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

const badgeVariants = cva("inline-block rounded-md text-xs font-medium md:text-sm", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      primary:
        "border-none bg-soft-pink-400 text-slate-800 dark:bg-club-800 dark:text-slate-100",
    },
    size: {
      default: "px-2 py-0.5",
      lg: "px-3 py-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
