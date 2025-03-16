import clsx from 'clsx';

import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';
import { Direction, Directions } from './draggable-slide';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

export function ActionIndicator(
  props: PropsWithChildren<{
    direction: Direction;
    onComplete: () => unknown;
  }>,
) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <motion.div
        onAnimationComplete={props.onComplete}
        initial={{ scale: 0 }}
        animate={{ scale: 2.5 }}
        transition={{ type: 'spring', damping: 50, stiffness: 200 }}
        className={clsx(
          'absolute aspect-square w-full rounded-full',
          props.direction === Directions.LEFT
            ? 'bg-pepto-600 dark:bg-salmon-800'
            : 'bg-miami-500 dark:bg-miami-700',
        )}
      />

      <motion.div
        className="relative z-10 text-white"
        initial={{ scale: 3, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {props.direction === Directions.LEFT ? (
          <div className="flex">
            <TrashIcon className="w-16 md:w-20" />
          </div>
        ) : (
          <div className="flex">
            <HeartIcon className="w-16 md:w-20" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
