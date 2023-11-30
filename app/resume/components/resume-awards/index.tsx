import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Badge, BadgeType } from 'components/badge';
import { SectionTitle } from '../SectionTitle';

export const ResumeAwards = (props) => {
  return (
    <section>
      <SectionTitle text={props.primary.title} />

      <ul>
        {props.items.map((item, i) => (
          <li key={i} className="mb-md">
            <div className="text-xl font-normal font-futura italic mb-1">
              <RichText render={item.title} />
            </div>
            <Badge type={BadgeType.primary}>{item.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
