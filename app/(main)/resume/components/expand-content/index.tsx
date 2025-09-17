import React, { PropsWithChildren, useState } from 'react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import styles from './index.module.css';
import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const collapsed = {
  height: '12lh',
  transition: {
    type: 'spring' as const,
    damping: 18,
    stiffness: 100,
  },
};

const expanded = {
  height: 'auto',
  transition: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 100,
  },
};

export default function ExpandContent(props: PropsWithChildren) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <motion.div
        className={clsx(
          'overflow-hidden',
          styles.mask,
          isExpanded && styles.hideMask,
        )}
        initial={collapsed}
        animate={isExpanded ? expanded : collapsed}
      >
        {props.children}
      </motion.div>

      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            key="expand-button"
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
              'flex w-full items-center justify-center gap-sm rounded-lg p-sm font-medium transition-colors',
              'hover:bg-slate-100',
              'dark:hover:bg-slate-600',
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Read More <PlusCircleIcon className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
