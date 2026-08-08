import type { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

type ProseProps = ComponentProps<"div">

function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      data-slot="prose"
      className={cn("prose dark:prose-invert", className)}
      {...props}
    />
  )
}

export { Prose }
export type { ProseProps }
