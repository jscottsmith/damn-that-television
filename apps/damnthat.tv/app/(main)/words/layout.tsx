import { Card } from '@/components/card';
import { SiteWrapper } from '@/components/site-wrapper';
import { Surface, surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import React, { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <Surface
      variant="default"
      className="py-24 md:py-40 flex min-h-screen items-center justify-center"
    >
      <SiteWrapper className="w-full max-w-screen-2xl">
        <Card className={cn(surfaceVariants({ variant: 'primary' }))}>
          <article className="p-3 md:p-12 xl:p-24 max-w-none">
            {props.children}
          </article>
        </Card>
      </SiteWrapper>
    </Surface>
  );
}
