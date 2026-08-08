import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@workspace/ui/lib/utils";

const titleVariants = cva("font-bold font-futura text-foreground", {
  variants: {
    size: {
      default: "text-xl md:text-2xl",
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
      xl: "text-4xl md:text-5xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type TitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TitleProps = ComponentProps<"h1"> &
  VariantProps<typeof titleVariants> & {
    as?: TitleElement;
  };

function Title({ className, size, as: Comp = "h1", ...props }: TitleProps) {
  return (
    <Comp
      data-slot="title"
      className={cn(titleVariants({ size }), className)}
      {...props}
    />
  );
}

export { Title, titleVariants };
export type { TitleElement, TitleProps };
