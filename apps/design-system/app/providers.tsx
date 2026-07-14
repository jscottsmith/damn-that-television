'use client';

import { type PropsWithChildren } from 'react';
import { ThemeProvider } from '@workspace/ui/components/theme-provider';

export function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
