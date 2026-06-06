import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

type ButtonSize = "sm" | "base" | "md";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "selection"
  | "warning"
  | "success"
  | "info"
  | "danger";
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
        primary:
          "text-white bg-slate-800 dark:text-slate-800 dark:bg-slate-200 shadow-club",
        secondary:
          "bg-slate-200 hocus:bg-slate-300 dark:bg-slate-900 dark:hocus:bg-slate-600 shadow-slate-700 dark:shadow-slate-600",
        selection:
          "bg-slate-200 hocus:bg-slate-300 dark:bg-slate-900 dark:hocus:bg-slate-600 shadow-slate-700 dark:shadow-slate-600 data-[selected=true]:bg-club data-[selected=true]:text-white data-[selected=true]:hocus:bg-club-600 data-[selected=true]:dark:bg-club data-[selected=true]:dark:text-white data-[selected=true]:dark:hocus:bg-club-600 data-[selected=true]:shadow-hard-sm data-[selected=true]:-translate-x-1 data-[selected=true]:-translate-y-1",
        warning:
          "text-white bg-orange-500 hocus:bg-orange-600 dark:text-orange-950 dark:hocus:bg-orange-400 shadow-slate-700 dark:shadow-slate-600",
        danger:
          "text-white bg-rose-500 hocus:bg-rose-600 dark:text-rose-950 dark:hocus:bg-rose-400 shadow-slate-700 dark:shadow-slate-600",
        info: "text-white bg-sky-500 hocus:bg-sky-600 dark:text-sky-950 dark:hocus:bg-sky-400 shadow-slate-700 dark:shadow-slate-600",
        success:
          "text-white bg-teal-500 hocus:bg-teal-600 dark:text-teal-950 dark:hocus:bg-teal-400 shadow-slate-700 dark:shadow-slate-600",
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
        className: "py-xs px-sm gap-1",
      },
      {
        presentation: "button",
        size: "base",
        className: "py-sm px-md gap-sm",
      },
      {
        presentation: "button",
        size: "md",
        className: "py-base px-lg gap-base",
      },
      {
        presentation: "icon",
        size: "sm",
        className: "p-sm",
      },
      {
        presentation: "icon",
        size: "base",
        className: "p-base",
      },
      {
        presentation: "icon",
        size: "md",
        className: "p-md",
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
