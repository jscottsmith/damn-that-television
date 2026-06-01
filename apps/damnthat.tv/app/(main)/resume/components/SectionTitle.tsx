import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { asText, type RichTextField } from '@prismicio/client';
import { createSlug } from '@/helpers/create-slug';
import { AnchorLinkCopy } from '@/components/anchor-link-copy';

export function SectionTitle(props: { text: RichTextField }) {
  const slug = createSlug(asText(props.text));
  return (
    <AnchorLinkCopy id={slug} className="mb-lg mt-2xl pb-2 ">
      <div
        id={slug}
        className="border-peach font-futura text-miami-old dark:border-club-700 border-b-2 text-4xl font-normal italic"
      >
        <PrismicRichText field={props.text} />
      </div>
    </AnchorLinkCopy>
  );
}
