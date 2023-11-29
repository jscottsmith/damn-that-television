'use client';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

export default function Commands() {
  const documentRef = useRef<Document>(document);
  const theme = useTheme();

  function flipTheme() {
    const flip = theme.resolvedTheme === 'light' ? 'dark' : 'light';
    theme.setTheme(flip);
  }

  function onKeyDown(e) {
    if (e.metaKey && e.which === 75) {
      flipTheme();
    }
  }

  useEventListener('keydown', onKeyDown, documentRef);

  return null;
}
