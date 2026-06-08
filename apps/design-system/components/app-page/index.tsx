import { PropsWithChildren } from 'react';

import { AppHeader } from '@/components/app-header';
import { SiteWrapper } from '@/components/site-wrapper';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';

export function AppPage({ children }: PropsWithChildren) {
  return (
    <SiteWrapper
      className={cn(surfaceVariants({ variant: 'secondary' }), 'min-h-screen')}
      padY
    >
      <AppHeader />
      {children}
    </SiteWrapper>
  );
}
