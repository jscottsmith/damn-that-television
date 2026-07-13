import React, { PropsWithChildren } from 'react';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export function CommandOverlay(
  props: PropsWithChildren<{ isCommand?: boolean }>,
) {
  return (
    <AnimatePresence>
      {props.children && (
        <motion.div
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-1/2 left-1/2 z-50 flex h-0 w-0 items-center justify-center select-none"
        >
          <div
            className={cn(
              surfaceVariants({ variant: 'default' }),
              'bg-slate-200/85 dark:bg-slate-900/85',
              'whitespace-nowrap rounded-2xl p-3 text-4xl font-bold',
            )}
          >
            {props.isCommand && '⌘ '}
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
