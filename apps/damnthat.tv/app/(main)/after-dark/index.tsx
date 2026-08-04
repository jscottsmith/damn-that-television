'use client';

import { useIsNotTouch } from 'hooks/use-media';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener, useTimeout } from 'usehooks-ts';

export const MESSAGE_TYPES = {
  WAIT_FOR_INTERACTION: 'wait_for_interaction',
  SCENE_LOADED: 'scene_loaded',
  USER_CLICK: 'user_click',
} as const;

const WINGS_URL = 'https://wings-mu.vercel.app';
const IDLE_MS = 30_000;
const UNLOAD_DELAY_MS = 2000;

type OpenMode = 'manual' | 'idle';

function useUserIsIdle(idleMs = IDLE_MS) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsIdle(true), idleMs);
  }, [idleMs]);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetIdleTimer]);

  useEventListener('mousemove', resetIdleTimer);
  useEventListener('keydown', resetIdleTimer);
  useEventListener('click', resetIdleTimer);
  useEventListener('scroll', resetIdleTimer);
  useEventListener('touchstart', resetIdleTimer);

  return { isIdle, resetIdleTimer };
}

export function AfterDark() {
  const isNotTouch = useIsNotTouch();
  const [openMode, setOpenMode] = useState<OpenMode | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  // Defer iframe mount until first open. Wings with ?waitForInteraction=true only
  // mounts its R3F scene after a click *inside* the iframe, and exposes no
  // postMessage to start — only WAIT_FOR_INTERACTION to pause. Loading without
  // that param lets the scene start on its own.
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const screenSaverOpen = openMode !== null;
  const { isIdle, resetIdleTimer } = useUserIsIdle();

  useEffect(() => {
    if (isIdle && openMode === null) {
      setOpenMode('idle');
      return;
    }
    // Idle-opened saver wakes as soon as the user is active again.
    // Manual opens stay up until the scene is clicked.
    if (!isIdle && openMode === 'idle') {
      setOpenMode(null);
    }
  }, [isIdle, openMode]);

  useEffect(() => {
    if (!screenSaverOpen) return;
    setHasLoaded(false);
    setIframeSrc(WINGS_URL);
    setIframeKey((key) => key + 1);
  }, [screenSaverOpen]);

  useEventListener('message', (event: MessageEvent) => {
    if (event.origin !== WINGS_URL) return;

    if (event.data?.type === MESSAGE_TYPES.SCENE_LOADED) {
      setHasLoaded(true);
    }
    if (event.data?.type === MESSAGE_TYPES.USER_CLICK) {
      setOpenMode(null);
      resetIdleTimer();
    }
  });

  // Tear down after the wipe-out animation so WebGL isn't left running
  useTimeout(
    () => {
      setIframeSrc(null);
      setHasLoaded(false);
    },
    !screenSaverOpen && iframeSrc ? UNLOAD_DELAY_MS : null,
  );

  if (!isNotTouch) return null;

  return (
    <motion.div
      className={clsx('bg-deep fixed left-0 top-0 z-[999999] h-full w-full')}
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
      onClick={() => {
        if (openMode === null) setOpenMode('manual');
      }}
      role={screenSaverOpen ? undefined : 'button'}
      aria-label={screenSaverOpen ? undefined : 'Open After Dark screensaver'}
    >
      {iframeSrc ? (
        <iframe
          key={iframeKey}
          className={clsx(
            'absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ease-out',
            hasLoaded ? 'opacity-100' : 'opacity-10',
            !screenSaverOpen && 'pointer-events-none',
          )}
          src={iframeSrc}
          title="After Dark"
          allow="autoplay"
        />
      ) : null}
    </motion.div>
  );
}
