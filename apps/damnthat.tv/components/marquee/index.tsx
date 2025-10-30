'use client';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useBoundingClientRect } from 'hooks/use-client-bounding-rect';
import { CardPrimary } from '../card';
import { SurfacePrimary } from '../surface';
import { useToggleSessionStorage } from 'hooks/use-toggle-session-storage';

type MarqueeProps = {
  className?: string;
  duration?: number;
  id: string;
  children: ReactNode[];
};

export const Marquee = (props: MarqueeProps) => {
  const toggle = useToggleSessionStorage('marquee-' + props.id);
  const ref = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<ReactNode[]>([]);
  const rect = useBoundingClientRect(ref);
  const isVisible = !toggle.isToggled;
  useEffect(() => {
    const w = rect?.width ?? 1;
    const amount = Math.ceil(window.innerWidth / w) * 2;

    if (w > 1) {
      setList(
        Array.from({ length: amount }).fill(props.children) as ReactNode[],
      );
    }
  }, [rect, props.children]);
  const duration = (rect?.width ?? 0) / 100;
  const sharedClassName = 'whitespace-nowrap pr-4';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          exit={{ height: 0, opacity: 0 }}
          animate={{ height: 36, opacity: 1 }}
          className="relative overflow-x-hidden"
        >
          <CardPrimary
            key={list.length}
            className={clsx(
              'flex w-full items-center font-futura text-lg font-bold uppercase italic',
              props.className,
            )}
          >
            {/* el to measure */}
            <div
              ref={ref}
              className={clsx(
                'pointer-events-none invisible absolute',
                sharedClassName,
              )}
            >
              {props.children}
            </div>
            {list.map((text, i) => (
              <motion.div
                key={i}
                className={clsx('inline-flex', sharedClassName)}
                initial={{ x: '0%' }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                  duration,
                }}
                animate={{ x: '-100%' }}
              >
                {text}
              </motion.div>
            ))}
            <SurfacePrimary asChild>
              <button
                className="absolute right-2 top-1/2 z-10 block -translate-y-1/2"
                onClick={() => toggle.toggle()}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </SurfacePrimary>
          </CardPrimary>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
