'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

export function AfterDark() {
  const [screenSaverOpen, setScreenSaverOpen] = useState(false);
  return (
    <>
      {/* this closes the screen saver */}
      {screenSaverOpen && (
        <div
          className="fixed inset-0 z-[10000] cursor-wait"
          onClick={() => setScreenSaverOpen(false)}
        />
      )}

      <motion.div
        aria-label="Screen Saver"
        role="button"
        initial="closed"
        animate={screenSaverOpen ? 'open' : 'closed'}
        whileHover={!screenSaverOpen ? 'hover' : 'open'}
        whileFocus={!screenSaverOpen ? 'hover' : 'open'}
        onClick={() => setScreenSaverOpen(true)}
        className="fixed left-0 top-0 z-[9999] h-12 w-12 cursor-help"
      >
        <motion.div
          className="fixed inset-0 bg-[#111]"
          onClick={() => setScreenSaverOpen(false)}
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
                  src="https://wings-mu.vercel.app/"
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
