import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Carousel from '../../components/carousel';
import { SectionSpacing } from '@/components/section-spacing';
import MediaAsset from '../../components/media-asset';
import { MediaGrid } from '../../components/media-grid';
import { Prose } from '@/components/typography/prose';
import { SHARED_TEXT_LIGHT_CLASSNAME } from '@/components/typography/constants';
import clsx from 'clsx';

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery: FC<GalleryProps> = ({ slice }) => {
  if (!slice.primary.media || slice.primary.media.length === 0) {
    return null;
  }

  function getVariation() {
    if (slice.variation === 'grid') {
      return (
        <MediaGrid columns={parseInt(slice.primary.columns || '1')}>
          {slice.primary.media.map((media, index) => (
            <MediaAsset key={index} media={media} showOverlay={false} />
          ))}
        </MediaGrid>
      );
    }
    return (
      <Carousel showArrows={true} showDots={true} loop={true}>
        {slice.primary.media.map((item, index) => (
          <MediaAsset key={index} media={item} showOverlay={false} />
        ))}
      </Carousel>
    );
  }

  return (
    <SectionSpacing asChild>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {getVariation()}
        <footer
          className={clsx(
            slice.variation === 'grid' ? 'py-base' : 'py-lg',
            'flex justify-center',
          )}
        >
          <Prose
            className={clsx(
              'prose-sm mx-auto text-balance',
              SHARED_TEXT_LIGHT_CLASSNAME,
            )}
          >
            <PrismicRichText field={slice.primary.description} />
          </Prose>
        </footer>
      </section>
    </SectionSpacing>
  );
};

export default Gallery;
