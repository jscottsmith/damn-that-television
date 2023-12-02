import { CardPadding } from '@/components/card';
import { SurfacePrimary } from '@/components/surface';
import { Title } from '@/components/typography/title';
import { PropsWithChildren } from 'react';

export function ComponentSection(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-4xl">
      <Title asChild className="mb-xl">
        <h2>{props.title}</h2>
      </Title>
      <SurfacePrimary className="w-fit">
        <CardPadding>{props.children}</CardPadding>
      </SurfacePrimary>
    </div>
  );
}
