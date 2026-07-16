"use client";
import { Surface, surfaceVariants } from "@workspace/ui/components/surface";
import { cn } from "@workspace/ui/lib/utils";
import { useScroll, motion, useSpring } from "motion/react";
import { CanvasHero } from "@/components/canvas-hero";
import Letters from "canvas/letters/LetterDrop";
import { useRef } from "react";
import styles from "./hero-canvas.module.css";

function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  // Add spring effect to the scroll progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  return (
    <motion.div
      className={cn(
        surfaceVariants({ variant: "pattern" }),
        styles.hero,
        "absolute inset-0 -z-10"
      )}
      style={{
        backgroundSize: "5rem 5rem",
        // @ts-expect-error
        ["--p"]: springProgress,
      }}
      ref={ref}
    />
  );
}

export function HeroCanvas() {
  const letters = useRef<Letters | null>(null);

  if (!letters.current) {
    letters.current = new Letters();
  }

  return (
    <Surface variant="card" className="relative z-0 overflow-hidden">
      <Background />
      <CanvasHero entities={[letters.current]} />
    </Surface>
  );
}
