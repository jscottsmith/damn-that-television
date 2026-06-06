import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

const eyeButtonVariants = cva(
  [
    "group h-16 w-16 px-2.5",
    "text-slate-800 dark:text-slate-100",
    "transition-all duration-300",
    "hover:bg-cream hover:shadow-hard hover:scale-[1.05]",
    "shadow-slate-800 dark:shadow-slate-950 dark:hover:bg-slate-600",
  ],
  {
    variants: {
      selected: {
        true: "bg-peach shadow-hard dark:bg-club",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

type EyeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isEyeActive: boolean
}

function EyeButton({ className, isEyeActive, ...props }: EyeButtonProps) {
  return (
    <button
      data-slot="eye-button"
      className={cn(eyeButtonVariants({ selected: isEyeActive }), className)}
      {...props}
    >
      <EyeMan active={isEyeActive} />
    </button>
  )
}

function EyeMan({ active }: { active?: boolean }) {
  return (
    <svg data-slot="eye-man" viewBox="0 0 200 268" fill="none">
      <path
        d="M192 192C192 167.6 182.307 144.2 165.054 126.946C147.8 109.693 124.4 100 100 100C75.6001 100 52.1995 109.693 34.9462 126.946C17.6928 144.2 8 167.6 8 192"
        stroke="currentColor"
        strokeWidth="14"
        className="transition-all group-hover:translate-y-[42px]"
        transform={active ? "translate(0 42)" : ""}
      />
      <path
        d="M8.00001 92C8.00001 116.4 17.6928 139.8 34.9462 157.054C52.1995 174.307 75.6001 184 100 184C124.4 184 147.8 174.307 165.054 157.054C182.307 139.8 192 116.4 192 92"
        stroke="currentColor"
        strokeWidth="14"
        className="transition-all group-hover:translate-y-[-42px]"
        transform={active ? "translate(0 -42)" : ""}
      />
      <circle
        cx="100"
        cy="142"
        r="38"
        fill="currentColor"
        className="transition-all group-hover:translate-y-[-84px]"
        transform={active ? "translate(0 -84)" : ""}
      />
    </svg>
  )
}

export { EyeButton, EyeMan, eyeButtonVariants }
export type { EyeButtonProps }
