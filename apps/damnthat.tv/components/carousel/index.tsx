'use client';
import { FC, useCallback, useEffect, useState, ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../buttons/button';
import clsx from 'clsx';
import { SurfaceInteractiveGlass } from '../surface-interactive';

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
}

const Carousel: FC<CarouselProps> = ({
  children,
  className = '',
  showArrows = true,
  showDots = true,
  loop = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  if (!children || children.length === 0) {
    return null;
  }

  return (
    <div className={clsx(`relative w-full`, className)}>
      {/* match media-asset rounding */}
      <div className="overflow-hidden rounded-lg md:rounded-xl" ref={emblaRef}>
        <div className="-ml-base flex">
          {children.map((child, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%] pl-base">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <nav className="pointer-events-none absolute inset-2 flex items-end justify-end gap-2">
          <SurfaceInteractiveGlass asChild>
            <button
              onClick={scrollPrev}
              className="pointer-events-auto rounded-full p-2"
              aria-label="Previous slide"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
          </SurfaceInteractiveGlass>
          <SurfaceInteractiveGlass asChild>
            <button
              onClick={scrollNext}
              className="pointer-events-auto rounded-full p-2"
              aria-label="Next slide"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </SurfaceInteractiveGlass>
        </nav>
      )}

      {/* Dot Indicators */}
      {showDots && (
        <div className="absolute -bottom-4 left-0 right-0 mt-4 flex justify-center space-x-2">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              className={clsx(
                `h-2 w-2 rounded-full !p-0`,
                index === selectedIndex && 'bg-gray-800 dark:bg-gray-200',
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
