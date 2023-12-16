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
            <div className="mb-1 font-futura text-xl font-normal italic">
              <RichText render={item.title} />
            </div>
            <Badge type={BadgeType.primary}>{item.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
