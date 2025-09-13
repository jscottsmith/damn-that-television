import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { Badge } from '@/components/badge';
import type { ResumeDocumentDataBodyResumeListSlice } from 'types/prismic-generated';

export const ResumeList = (props: ResumeDocumentDataBodyResumeListSlice) => {
  return (
    <section>
      <SectionTitle text={props.primary.title} />
      <Prose className="mb-base">
        <PrismicRichText field={props.primary.content} />
      </Prose>
      <ul className="flex flex-wrap gap-2">
        {props.items.map((item, i) => (
          <li key={i}>
            <Badge size="lg" as="span">
              <PrismicRichText field={item.content} />
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
