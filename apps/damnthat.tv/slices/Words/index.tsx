import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Prose } from '@/components/typography/prose';

/**
 * Props for `Words`.
 */
export type WordsProps = SliceComponentProps<Content.ContentSlice>;

/**
 * Component for "Words" Slices.
 */
const Words: FC<WordsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Prose className="prose mx-auto xl:prose-lg">
        <PrismicRichText field={slice.primary.content} />
      </Prose>
    </section>
  );
};

export default Words;
