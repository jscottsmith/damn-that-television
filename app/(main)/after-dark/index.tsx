'use client';

import { useIsNotTouch } from 'hooks/use-media';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { useEventListener } from 'usehooks-ts';

export const MESSAGE_TYPES = {
  SCENE_LOADED: 'scene_loaded',
  USER_CLICK: 'user_click',
} as const;

const WINGS_URL = 'https://wings-mu.vercel.app';

export function AfterDark() {
  const isNotTouch = useIsNotTouch();
  const [screenSaverOpen, setScreenSaverOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Add window click listener to close screen saver
  useEventListener('click', () => {
    if (screenSaverOpen) {
      setScreenSaverOpen(false);
    }
  });

  // Listen for postMessage events from the iframe
  useEventListener('message', (event: MessageEvent) => {
    // Only listen to messages from the iframe origin
    if (event.origin !== WINGS_URL) return;

    if (event.data.type === MESSAGE_TYPES.SCENE_LOADED) {
      setHasLoaded(true);
    } else if (event.data.type === MESSAGE_TYPES.USER_CLICK) {
      setScreenSaverOpen(false);
    }
  });

  // disable this feature on touch devices
  if (!isNotTouch) return null;

  return (
    <>
      <motion.div
        aria-label="Screen Saver"
        role="button"
        initial="closed"
        animate={screenSaverOpen ? 'open' : 'closed'}
        whileHover={!screenSaverOpen ? 'hover' : 'open'}
        whileFocus={!screenSaverOpen ? 'hover' : 'open'}
        onClick={(e) => {
          e.stopPropagation();
          setScreenSaverOpen(true);
        }}
        className="fixed left-0 top-0 z-[9999] h-12 w-12 cursor-help"
      >
        <motion.div
          className="fixed inset-0 bg-[#111]"
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 10,
            mass: 1,
          }}
          variants={{
            open: { clipPath: 'polygon(0% 0%, 0% 200%, 200% 0%)' },
            closed: { clipPath: 'polygon(0% 0%, 0% 0px, 0px 0%)' },
            hover: { clipPath: 'polygon(0% 0%, 0% 12px, 12px 0%)' },
          }}
        >
          <AnimatePresence>
            {screenSaverOpen && (
              <motion.div
                key="screen-saver"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999]"
              >
                <iframe
                  src={WINGS_URL}
                  className="absolute inset-0 h-full w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
