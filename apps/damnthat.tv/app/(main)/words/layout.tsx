import { CardPrimary } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { Surface } from '@workspace/ui/components/surface';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <Surface
      variant="background"
      className="py-4xl md:py-6xl flex min-h-screen items-center justify-center"
    >
      <SiteWrapper className="w-full max-w-screen-2xl">
        <CardPrimary>
          <article className="p-base md:p-2xl xl:p-4xl max-w-none">
            {props.children}
          </article>
        </CardPrimary>
      </SiteWrapper>
    </Surface>
  );
}
