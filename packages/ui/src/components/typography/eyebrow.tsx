import type { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

type EyebrowProps = ComponentProps<"p">

function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(
        "font-bold font-poppins text-sm uppercase text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Eyebrow }
export type { EyebrowProps }
