import { Title } from '@/components/typography/title';
import { PropsWithChildren } from 'react';

export function ComponentSection(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-xl">
      <Title asChild>
        <h2>{props.title}</h2>
      </Title>
      {props.children}
    </div>
  );
}
