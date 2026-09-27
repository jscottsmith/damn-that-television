import { type ReactNode } from 'react';
import {
  type Content,
  type ImageField,
  type RichTextField,
} from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Carousel from '../../components/carousel';
import { SectionSpacing } from '@/components/section-spacing';
import MediaAsset, { type MediaAssetImage } from '../../components/media-asset';
import { MediaGrid } from '../../components/media-grid';
import { Prose } from '@workspace/ui/components/typography/prose';
import clsx from 'clsx';

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

function galleryImage(image: ImageField<never>): MediaAssetImage | null {
  if (!image.url || !image.dimensions) {
    return null;
  }

  return {
    src: image.url,
    alt: image.alt,
    width: image.dimensions.width,
    height: image.dimensions.height,
  };
}

function galleryDescription(description: RichTextField): ReactNode {
  if (!description || description.length === 0) {
    return null;
  }

  return <PrismicRichText field={description} />;
}

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps) => {
  if (!slice.primary.media || slice.primary.media.length === 0) {
    return null;
  }

  const media = slice.primary.media.map((item, index) => (
    <MediaAsset
      key={index}
      image={galleryImage(item.image)}
      title={item.title}
      description={galleryDescription(item.description)}
      showOverlay={false}
    />
  ));

  function getVariation() {
    if (slice.variation === 'grid') {
      return (
        <MediaGrid columns={parseInt(slice.primary.columns || '1')}>
          {media}
        </MediaGrid>
      );
    }
    return (
      <Carousel showArrows={true} showDots={true} loop={true}>
        {media}
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
            slice.variation === 'grid' ? 'py-3' : 'py-6',
            'flex justify-center',
          )}
        >
          <Prose className="prose-sm text-muted-foreground mx-auto text-balance">
            <PrismicRichText field={slice.primary.description} />
          </Prose>
        </footer>
      </section>
    </SectionSpacing>
  );
};

export default Gallery;
