import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/client';

export function SectionTitle(props: { text: RichTextField }) {
  return (
    <div className="mb-lg mt-2xl border-b-2 border-peach pb-2 font-futura text-4xl font-normal italic text-miami-old dark:border-club-700">
      <PrismicRichText field={props.text} />
    </div>
  );
}
