import { SiteWrapper } from '@/components/site-wrapper';
import { SurfaceBackground, SurfacePrimary } from '@/components/surface';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <SurfaceBackground className="flex min-h-screen items-center justify-center">
      <SiteWrapper className="w-full">
        <SurfacePrimary asChild>
          <article className="max-w-none p-base md:p-2xl xl:p-4xl">
            {props.children}
          </article>
        </SurfacePrimary>
      </SiteWrapper>
    </SurfaceBackground>
  );
}
