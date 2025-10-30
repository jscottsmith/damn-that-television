'use client';
import { SurfacePattern, SurfacePrimary } from '@/components/surface';
import { useScroll, motion, useSpring } from 'motion/react';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';
import { useRef } from 'react';
import styles from './hero-canvas.module.css';

function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  });

  // Add spring effect to the scroll progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  return (
    <SurfacePattern className="absolute inset-0 -z-10" asChild>
      <motion.div
        className={styles.hero}
        style={{
          // @ts-expect-error
          ['--p']: springProgress,
        }}
        ref={ref}
      />
    </SurfacePattern>
  );
}

export function HeroCanvas() {
  const letters = useRef<Letters | null>(null);

  if (!letters.current) {
    letters.current = new Letters();
  }

  return (
    <SurfacePrimary className="relative z-0 overflow-hidden">
      <Background />
      <CanvasHero entities={[letters.current]} />
    </SurfacePrimary>
  );
}
