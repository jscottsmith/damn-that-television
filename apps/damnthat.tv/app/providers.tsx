'use client';
import { ThemeProvider } from 'next-themes';
import Commands from './commands';
import { useIsNotTouch } from 'hooks/use-media';

export function Providers({ children }) {
  const isNotTouch = useIsNotTouch();

  return (
    <ThemeProvider attribute="class">
      {isNotTouch && <Commands />}
      {children}
    </ThemeProvider>
  );
}
