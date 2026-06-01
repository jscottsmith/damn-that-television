import { CardPrimary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { SurfaceBackground } from '@/components/surface';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <SurfaceBackground className="py-4xl md:py-6xl flex min-h-screen items-center justify-center">
      <SiteWrapper className="w-full max-w-screen-2xl">
        <CardPrimary>
          <article className="p-base md:p-2xl xl:p-4xl max-w-none">
            {props.children}
          </article>
        </CardPrimary>
      </SiteWrapper>
    </SurfaceBackground>
  );
}
