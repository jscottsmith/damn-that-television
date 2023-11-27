import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Badge } from 'components/badge';
import { Prose } from '@/components/typography/prose';

export const ResumeAwards = (props) => {
  return (
    <section>
      <Prose>
        <RichText render={props.primary.title} />
      </Prose>
      <ul>
        {props.items.map((item, i) => (
          <li key={i} className="mb-md">
            <div className="text-xl font-normal italic">
              <RichText render={item.title} />
            </div>
            <Badge background="bg-peach">{item.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
