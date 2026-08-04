'use client';

import { type PropsWithChildren } from 'react';
import { SidebarTrigger } from '@workspace/ui/components/sidebar';

import { APP_CHROME_SIDEBAR_ID } from '../constants';

export function AppHeader({ children }: PropsWithChildren) {
  return (
    <header
      className="border-border bg-background/80 sticky top-0 z-10 flex items-center gap-3 border-b p-3 backdrop-blur-sm [&_h1]:text-sm [&_h1]:font-medium"
      data-slot="app-header"
    >
      <SidebarTrigger aria-controls={APP_CHROME_SIDEBAR_ID} />
      {children}
    </header>
  );
}
