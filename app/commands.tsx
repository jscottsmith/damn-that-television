'use client';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useEventListener, useIsClient, useTimeout } from 'usehooks-ts';
import { AnimatePresence, motion } from 'motion/react';
import { SurfaceBackground } from '@/components/surface';

export default function Commands() {
  const isClient = useIsClient();
  const theme = useTheme();
  const [key, setKey] = useState<string | null>(null);

  useTimeout(() => setKey(null), key ? 1000 : null);

  function flipTheme() {
    const flip = theme.resolvedTheme === 'light' ? 'dark' : 'light';
    theme.setTheme(flip);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.metaKey && e.key === 'k') {
      flipTheme();
      setKey(e.key);
    }
  }

  useEventListener('keydown', onKeyDown);

  return isClient ? (
    <AnimatePresence>
      {key && (
        <motion.div
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed left-1/2 top-1/2 z-50 flex h-0 w-0 select-none items-center justify-center"
        >
          <SurfaceBackground className="whitespace-nowrap rounded-2xl bg-opacity-85 p-3 text-4xl font-bold uppercase dark:bg-opacity-85">
            ⌘ {key}
          </SurfaceBackground>
        </motion.div>
      )}
    </AnimatePresence>
  ) : null;
}
