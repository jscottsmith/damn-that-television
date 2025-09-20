import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Carousel from '../../components/carousel';
import { SectionSpacing } from '@/components/section-spacing';
import MediaAsset from '../../components/media-asset';
import { MediaGrid } from '../../components/media-grid';

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
          {slice.primary.media.map((item, index) => (
            <MediaAsset
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              showOverlay={false}
            />
          ))}
        </MediaGrid>
      );
    }
    return (
      <Carousel showArrows={true} showDots={true} loop={true}>
        {slice.primary.media.map((item, index) => (
          <MediaAsset
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            showOverlay={false}
          />
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
      </section>
    </SectionSpacing>
  );
};

export default Gallery;
