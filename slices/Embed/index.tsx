import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { SectionSpacing } from '@/components/section-spacing';
import EmbedBlock from '@/components/embed-block';

/**
 * Props for `Embed`.
 */
export type EmbedProps = SliceComponentProps<Content.EmbedSlice>;

/**
 * Component for "Embed" Slices.
 */
const Embed: FC<EmbedProps> = ({ slice }) => {
  return (
    <SectionSpacing asChild>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <EmbedBlock html={slice.primary.html} />
      </section>
    </SectionSpacing>
  );
};

export default Embed;
