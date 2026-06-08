'use client';

import { SidebarTrigger } from '@workspace/ui/components/sidebar';

import { APP_CHROME_SIDEBAR_ID } from '@/components/app-chrome';

export function AppHeader() {
  return (
    <header>
      <SidebarTrigger aria-controls={APP_CHROME_SIDEBAR_ID} />
    </header>
  );
}
