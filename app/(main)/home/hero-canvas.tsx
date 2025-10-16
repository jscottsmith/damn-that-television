'use client';
import { SurfacePattern, SurfacePrimary } from '@/components/surface';
import {
  useScroll,
  motion,
  useTransform,
  useSpring,
  // useMotionValueEvent,
} from 'motion/react';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';
import { useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const CLIPS = {
  desktop: 'inset(128px 128px 0 128px round 48px 48px 0 0)',
  mobile: 'inset(48px 48px 0 48px round 48px 48px 0 0)',
  end: 'inset(-48px -48px 0 -48px round 24px 24px 0 0)',
};

function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  });
  const isSm = useMediaQuery('(min-width: 640px)');

  // Add spring effect to the scroll progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  const y = useTransform(() => springProgress.get() * 100);
  const t = useTransform(
    springProgress,
    [0, 1],
    [isSm ? CLIPS.desktop : CLIPS.mobile, CLIPS.end],
  );

  return (
    <SurfacePattern className="absolute inset-0 -z-10" asChild>
      <motion.div
        style={{
          y,
          clipPath: t,
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
