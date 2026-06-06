import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

type CTAButtonType = "pepto" | "blue" | "gray" | "deep"
type CTAButtonSize = "sm" | "default" | "md" | "lg"

const ctaButtonVariants = cva(
  "whitespace-nowrap font-light leading-loose transition-all hover:scale-105",
  {
    variants: {
      buttonType: {
        deep: "bg-slate-800 text-slate-100 disabled:bg-gray-700 disabled:text-gray-200 hover:text-club",
        gray: "bg-gray-300 text-gray-900 disabled:bg-gray-700 disabled:text-gray-200 hover:bg-gray-700 hover:text-gray-50",
        blue: "bg-blue-700 text-gray-100 disabled:bg-gray-700 disabled:text-gray-200 hover:bg-blue-900 hover:text-gray-50",
        pepto: "bg-pepto text-deep disabled:bg-gray-700 disabled:text-gray-200 hover:bg-lunar hover:text-white",
      },
      buttonSize: {
        sm: "px-3 py-0 rounded text-lg md:px-4 md:py-1",
        default: "px-4 py-1 rounded-md text-xl md:px-6 md:py-2",
        md: "px-5 py-2 rounded-md text-2xl md:px-7 md:py-3",
        lg: "px-6 py-3 rounded-lg text-2xl font-bold md:px-9 md:py-6 md:text-3xl",
      },
    },
    defaultVariants: {
      buttonType: "gray",
      buttonSize: "default",
    },
  }
)

type CTAButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ctaButtonVariants>

function CTAButton({
  className,
  buttonType = "gray",
  buttonSize = "default",
  ...props
}: CTAButtonProps) {
  return (
    <button
      data-slot="cta-button"
      className={cn(ctaButtonVariants({ buttonType, buttonSize }), className)}
      {...props}
    />
  )
}

export { CTAButton, ctaButtonVariants }
export type { CTAButtonProps, CTAButtonSize, CTAButtonType }
