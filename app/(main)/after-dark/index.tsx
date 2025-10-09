'use client';

import { useIsNotTouch } from 'hooks/use-media';
import { motion } from 'motion/react';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useEventListener, useTimeout } from 'usehooks-ts';

export const MESSAGE_TYPES = {
  WAIT_FOR_INTERACTION: 'wait_for_interaction',
  SCENE_LOADED: 'scene_loaded',
  USER_CLICK: 'user_click',
} as const;

const WINGS_URL = 'http://localhost:5174';
const URL_SEARCH_PARAM = '?waitForInteraction=true';

export function AfterDark() {
  const isNotTouch = useIsNotTouch();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [screenSaverOpen, setScreenSaverOpen] = useState(false);

  const [hasLoaded, setHasLoaded] = useState(false);

  // Listen for postMessage events from the iframe
  useEventListener('message', (event: MessageEvent) => {
    // Only listen to messages from the iframe origin
    if (event.origin !== WINGS_URL) return;

    if (event.data.type === MESSAGE_TYPES.SCENE_LOADED) {
      setHasLoaded(true);
    }
    if (event.data.type === MESSAGE_TYPES.USER_CLICK) {
      if (screenSaverOpen) {
        setScreenSaverOpen(false);
      } else {
        setScreenSaverOpen(true);
      }
    }
  });

  // stop the scene from playing after 1 second if the screen saver is not open so the wipe out animation can play through
  useTimeout(
    () => {
      // stop the scene from playing
      if (iframeRef.current?.contentWindow) {
        iframeRef.current?.contentWindow.postMessage(
          { type: MESSAGE_TYPES.WAIT_FOR_INTERACTION },
          '*',
        );
      }
    },
    !screenSaverOpen ? 2000 : null,
  );

  // disable this feature on touch devices
  if (!isNotTouch) return null;

  return (
    <>
      <motion.div
        className={clsx('fixed left-0 top-0 z-[999999] h-full w-full bg-deep')}
        transition={{
          bounce: 0.1,
        }}
        initial="closed"
        animate={screenSaverOpen ? 'open' : 'closed'}
        whileHover={!screenSaverOpen ? 'hover' : 'open'}
        variants={{
          open: { clipPath: 'polygon(0% 0%, 0% 200%, 200% 0%)', opacity: 1 },
          closed: { clipPath: 'polygon(0% 0%, 0% 18px, 18px 0%)', opacity: 0 },
          hover: { clipPath: 'polygon(0% 0%, 0% 32px, 32px 0%)', opacity: 1 },
        }}
      >
        <iframe
          className={clsx(
            'absolute inset-0 h-full w-full transition-opacity duration-300 ease-out',
            hasLoaded ? 'opacity-100' : 'opacity-0',
          )}
          ref={iframeRef}
          src={WINGS_URL + URL_SEARCH_PARAM}
        />
      </motion.div>
    </>
  );
}
