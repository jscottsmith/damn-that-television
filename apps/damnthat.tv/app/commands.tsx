'use client';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useEventListener, useIsClient, useTimeout } from 'usehooks-ts';
import { CommandOverlay } from '@/components/command-overlay';

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
      setKey(e.key.toUpperCase());
    }
  }

  useEventListener('keydown', onKeyDown);

  if (!isClient) return null;

  return <CommandOverlay isCommand>{key}</CommandOverlay>;
}
