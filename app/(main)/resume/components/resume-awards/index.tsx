import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { Badge, BadgeType } from 'components/badge';
import { SectionTitle } from '../SectionTitle';
import type { ResumeDocumentDataBodyResumeAwardsSlice } from 'types/prismic-generated';

export const ResumeAwards = (
  props: ResumeDocumentDataBodyResumeAwardsSlice,
) => {
  return (
    <section>
      <SectionTitle text={props.primary.title} />

      <ul>
        {props.items.map((item, i) => (
          <li key={i} className="mb-md">
            <div className="mb-1 font-futura text-xl font-normal italic">
              <PrismicRichText field={item.title} />
            </div>
            <Badge type={BadgeType.primary}>{item.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
