import { CardPadding } from '@/components/card';
import { Surface } from '@workspace/ui/components/surface';
import { Title } from '@workspace/ui/components/typography/title';
import { PropsWithChildren } from 'react';

export function ComponentSection(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-24">
      <Title as="h2" className="mb-8">
        {props.title}
      </Title>
      <Surface variant="card" className="w-fit">
        <CardPadding>{props.children}</CardPadding>
      </Surface>
    </div>
  );
}
