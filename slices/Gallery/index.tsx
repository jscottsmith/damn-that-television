import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Carousel from '../../components/carousel';
import { SectionSpacing } from '@/components/section-spacing';

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

  const carouselItems = slice.primary.media.map((item, index) => (
    <div key={index} className="relative">
      {item.image && (
        <PrismicNextImage
          field={item.image}
          className="h-auto w-full object-cover"
          alt={item.title || ''}
        />
      )}
      {/* {(item.title || item.description) && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
          {item.title && (
            <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
          )}
          {item.description && (
            <div className="prose prose-invert max-w-none">
              <PrismicRichText field={item.description} />
            </div>
          )}
        </div>
      )} */}
    </div>
  ));

  return (
    <SectionSpacing asChild>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Carousel showArrows={true} showDots={true} loop={true}>
          {carouselItems}
        </Carousel>
      </section>
    </SectionSpacing>
  );
};

export default Gallery;
