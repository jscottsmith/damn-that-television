'use client';

import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

type FooterRevealProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
};

export function FooterReveal({ scrollTargetRef }: FooterRevealProps) {
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ['start end', 'end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-8%']);

  return (
    <div className="sticky bottom-0 z-0 flex min-h-[50vh] items-end">
      <div
        className={cn(
          surfaceVariants({ variant: 'pattern' }),
          '-z-1 pointer-events-none absolute bottom-0 left-0 right-0 top-[-50vh]',
        )}
        style={{ backgroundSize: '5rem 5rem' }}
      />
      <motion.div
        className={clsx(
          'font-futura font-black uppercase leading-none tracking-tight',
          'text-cream text-shadow-deep dark:text-miami',
          'text-shadow-[0.1em_0.1em_0_var(--color-deep)]',
          'whitespace-nowrap py-2 text-center sm:py-4',
          'text-[clamp(8rem,25vw,30rem)]',
        )}
        style={{
          x,
          textBoxTrim: 'trim-both',
          textBoxEdge: 'cap alphabetic',
        }}
        aria-hidden
      >
        DamnTV
      </motion.div>
    </div>
  );
}
