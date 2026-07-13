import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

import styles from "./surface.module.css";

const surfaceVariants = cva("", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      card: "bg-card text-card-foreground",
      popover: "bg-popover text-popover-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      muted: "bg-muted text-muted-foreground",
      accent: "bg-accent text-accent-foreground",
      sidebar: "bg-sidebar text-sidebar-foreground",
      glass: "bg-secondary/60 text-secondary-foreground backdrop-blur-lg",
      pattern: ["bg-background text-foreground", styles.pattern],
    },
  },
  defaultVariants: {
    variant: "default",
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
