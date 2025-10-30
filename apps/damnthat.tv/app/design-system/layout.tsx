import { SideNavMenu } from '@/components/side-nav-menu';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfaceBackground, SurfaceSecondary } from '@/components/surface';
import { routes } from 'app/routes.constants';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <SurfaceBackground>
      <SideNavMenu routes={routes}>
        <SurfaceSecondary asChild>
          <SiteWrapper className="min-h-screen" padY>
            {props.children}
          </SiteWrapper>
        </SurfaceSecondary>
      </SideNavMenu>
    </SurfaceBackground>
  );
}
