import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

export function SectionTitle(props: { text: RichTextBlock[] }) {
  return (
    <div className="font-normal italic font-futura text-4xl text-miami-old border-peach dark:border-pepto pb-2 border-b-2 mt-2xl mb-lg">
      <RichText render={props.text} />
    </div>
  );
}
