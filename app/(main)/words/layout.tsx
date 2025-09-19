import { CardPrimary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfaceBackground } from '@/components/surface';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <SurfaceBackground className="flex min-h-screen items-center justify-center py-4xl md:py-6xl">
      <SiteWrapper className="w-full">
        <CardPrimary>
          <article className="max-w-none p-base md:p-2xl xl:p-4xl">
            {props.children}
          </article>
        </CardPrimary>
      </SiteWrapper>
    </SurfaceBackground>
  );
}
