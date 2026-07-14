'use client';
import { ThemeProvider } from '@workspace/ui/components/theme-provider';
import Commands from './commands';
import { useIsNotTouch } from 'hooks/use-media';

export function Providers({ children }) {
  const isNotTouch = useIsNotTouch();

  return (
    <ThemeProvider>
      {isNotTouch && <Commands />}
      {children}
    </ThemeProvider>
  );
}
