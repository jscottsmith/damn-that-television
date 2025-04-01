import React, { PropsWithChildren } from 'react';
import { SurfaceBackground } from './surface';
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
          className="fixed left-1/2 top-1/2 z-50 flex h-0 w-0 select-none items-center justify-center"
        >
          <SurfaceBackground className="whitespace-nowrap rounded-2xl bg-opacity-85 p-3 text-4xl font-bold dark:bg-opacity-85">
            {props.isCommand && '⌘ '}
            {props.children}
          </SurfaceBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
