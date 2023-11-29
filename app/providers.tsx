'use client';

import { ThemeProvider } from 'next-themes';
import Commands from './commands';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class">
      {typeof window !== 'undefined' && <Commands />}
      {children}
    </ThemeProvider>
  );
}
