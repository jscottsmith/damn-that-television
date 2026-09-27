import { Children, type ReactNode } from 'react';
import clsx from 'clsx';
import Carousel from '@/components/carousel';
import { MediaGrid } from '@/components/media-grid';
import { SectionSpacing } from '@/components/section-spacing';
import { Prose } from '@workspace/ui/components/typography/prose';

type GalleryVariant = 'grid' | 'carousel';

export function Gallery({
  variant = 'carousel',
  columns = 1,
  caption,
  children,
}: {
  variant?: GalleryVariant;
  columns?: number;
  caption?: string;
  children?: ReactNode;
}) {
  const items = Children.toArray(children);

  if (items.length === 0) {
    return null;
  }

  const columnCount = Number(columns) || 1;
  const media =
    variant === 'grid' ? (
      <MediaGrid columns={columnCount}>{items}</MediaGrid>
    ) : (
      <Carousel showArrows={true} showDots={true} loop={true}>
        {items}
      </Carousel>
    );

  return (
    <SectionSpacing asChild>
      <section data-content-block="gallery" data-variant={variant}>
        {media}
        {caption ? (
          <footer
            data-variant={variant}
            className={clsx(
              'flex justify-center',
              'py-6 data-[variant=grid]:py-3',
            )}
          >
            <Prose className="prose-sm text-muted-foreground mx-auto text-balance">
              <div dangerouslySetInnerHTML={{ __html: caption }} />
            </Prose>
          </footer>
        ) : null}
      </section>
    </SectionSpacing>
  );
}
