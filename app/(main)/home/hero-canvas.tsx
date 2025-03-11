'use client';
import { SurfacePattern } from '@/components/surface';
import { useScroll, motion, useTransform } from 'motion/react';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';
import { useRef } from 'react';

function Background() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <SurfacePattern className="fixed inset-0 -z-10" asChild>
      <motion.div style={{ y }} />
    </SurfacePattern>
  );
}

export function HeroCanvas() {
  const letters = useRef<Letters | null>(null);

  if (!letters.current) {
    letters.current = new Letters();
  }

  return (
    <>
      <Background />
      <CanvasHero entities={[letters.current]} />
    </>
  );
}
