import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { Badge } from '@/components/badge';

export const ResumeList = (props) => {
  return (
    <section>
      <SectionTitle text={props.primary.title} />
      <Prose className="mb-base">
        <RichText render={props.primary.content} />
      </Prose>
      <ul className="flex flex-wrap gap-2">
        {props.items.map((item, i) => (
          <li key={i}>
            <Badge size="lg" as="span">
              <RichText render={item.content} />
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
