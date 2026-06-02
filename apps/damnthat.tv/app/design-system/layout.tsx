import { SideNavMenu } from '@/components/side-nav-menu';
import { SiteWrapper } from '@/components/site-wrapper';
import { Surface, surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { routes } from 'app/routes.constants';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <Surface variant="background">
      <SideNavMenu routes={routes}>
        <SiteWrapper
          className={cn(surfaceVariants({ variant: 'secondary' }), 'min-h-screen')}
          padY
        >
          {props.children}
        </SiteWrapper>
      </SideNavMenu>
    </Surface>
  );
}
