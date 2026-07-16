import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

type ButtonSize = "sm" | "base" | "md";
type ButtonVariant = "primary" | "secondary" | "destructive";
type ButtonPresentation = "button" | "icon";

const buttonVariants = cva(
  [
    "font-bold font-poppins whitespace-nowrap",
    "inline-flex items-center rounded-full",
    "transition-all duration-200",
    "hover:shadow-hard-xs hover:-translate-x-0.5 hover:-translate-y-0.5",
    "focus:shadow-hard-xs focus:-translate-x-0.5 focus:-translate-y-0.5 focus:outline-none",
    "active:duration-100 hover:active:translate-x-0 hover:active:translate-y-0 hover:active:shadow-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-accent",
        secondary:
          "bg-secondary text-secondary-foreground hocus:bg-accent hocus:text-accent-foreground shadow-secondary",
        destructive: "bg-destructive text-white hocus:bg-destructive/90",
      },
      size: {
        sm: "text-sm [&_svg:not([class*='size-'])]:size-4",
        base: "text-base [&_svg:not([class*='size-'])]:size-5",
        md: "text-lg [&_svg:not([class*='size-'])]:size-6",
      },
      presentation: {
        button: "",
        icon: "",
      },
    },
    compoundVariants: [
      {
        presentation: "button",
        size: "sm",
        className: "py-1 px-2 gap-1",
      },
      {
        presentation: "button",
        size: "base",
        className: "py-2 px-4 gap-2",
      },
      {
        presentation: "button",
        size: "md",
        className: "py-3 px-6 gap-3",
      },
      {
        presentation: "icon",
        size: "sm",
        className: "p-2",
      },
      {
        presentation: "icon",
        size: "base",
        className: "p-3",
      },
      {
        presentation: "icon",
        size: "md",
        className: "p-4",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "base",
      presentation: "button",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "secondary",
  size = "base",
  presentation = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, presentation }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };
export type { ButtonPresentation, ButtonProps, ButtonSize, ButtonVariant };
