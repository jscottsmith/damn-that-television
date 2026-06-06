import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

const surfaceVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      background: "bg-background text-foreground",
      glass: "bg-secondary/60 text-secondary-foreground backdrop-blur-lg",
      pattern: [
        "bg-background text-foreground",
        "bg-[url('/static/pattern-1.svg')] bg-[length:5rem_5rem] dark:bg-[url('/static/pattern-0.svg')]",
      ],
    },
  },
  defaultVariants: {
    variant: "background",
  },
});

type SurfaceProps = React.ComponentProps<"div"> &
  VariantProps<typeof surfaceVariants>;

function Surface({ className, variant, ...props }: SurfaceProps) {
  return (
    <div
      data-slot="surface"
      className={cn(surfaceVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Surface, surfaceVariants };
