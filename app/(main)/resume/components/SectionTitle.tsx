import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

export function SectionTitle(props: { text: RichTextBlock[] }) {
  return (
    <div className="mb-lg mt-2xl border-b-2 border-peach pb-2 font-futura text-4xl font-normal italic text-miami-old dark:border-pepto">
      <RichText render={props.text} />
    </div>
  );
}
