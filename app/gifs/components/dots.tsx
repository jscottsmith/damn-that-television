import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

function limitedListRange(
  list: unknown[],
  currentIndex: number,
  max: number,
): [number, number] {
  const halfMax = Math.floor(max / 2);
  const start = currentIndex - halfMax;
  const end = start + max - 1;
  if (list.length > max) {
    if (start < 0) {
      return [0, max - 1];
    }
    return [start, end];
  }
  return [0, list.length - 1];
}

function isWithinRange(currentIndex: number, range: [number, number]) {
  return currentIndex >= range[0] && currentIndex <= range[1];
}

export function Dots({
  max = 9,
  ...props
}: {
  current: number;
  length: number;
  max?: number;
}) {
  const dots = Array(props.length).fill(0);

  return (
    <div className="flex gap-1">
      <AnimatePresence>
        {dots.map((_, index) => {
          const range = limitedListRange(dots, props.current, max);
          const displayed = isWithinRange(index, range);
          return displayed ? (
            <motion.button
              key={index}
              layout
              initial={{ scale: 0 }}
              exit={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
              className={clsx(
                'inline-block h-2 w-2 rounded-full',
                props.current === index
                  ? 'bg-club-500 dark:bg-miami'
                  : 'bg-slate-200 dark:bg-slate-600',
              )}
            />
          ) : null;
        })}
      </AnimatePresence>
    </div>
  );
}
