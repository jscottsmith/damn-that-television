import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@workspace/ui/lib/utils";

const heroTitleVariants = cva(
  "font-futura font-black italic uppercase text-foreground",
  {
    variants: {
      size: {
        sm: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
        default: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
        md: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
        lg: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type HeroTitleProps = ComponentProps<"h1"> &
  VariantProps<typeof heroTitleVariants>;

function HeroTitle({ className, size, ...props }: HeroTitleProps) {
  return (
    <h1
      data-slot="hero-title"
      className={cn(heroTitleVariants({ size }), className)}
      {...props}
    />
  );
}

export { HeroTitle, heroTitleVariants };
export type { HeroTitleProps };
