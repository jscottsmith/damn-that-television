import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Prose } from '@/components/typography/prose';
import { Badge, BadgeType } from 'components/badge';

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
            <Badge type={BadgeType.primary}>{item.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
