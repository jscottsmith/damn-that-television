'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { SurfaceInteractiveGlass } from './surface-interactive';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { Prose } from '@workspace/ui/components/typography/prose';
import { AnimatePresence } from 'motion/react';
import { AnimateSlide } from './animations/animate-slide';
import { useHandleClickOutside } from '../hooks/use-handle-click-outside';

export interface MediaAssetImage {
  src: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}

interface MediaAssetProps {
  image?: MediaAssetImage | null;
  title?: string | null;
  description?: ReactNode;
  showOverlay?: boolean;
}

/**
 * Component for rendering a single media asset with optional title and description overlay.
 */
const MediaAsset = ({
  image,
  title,
  description,
  showOverlay = false,
}: MediaAssetProps) => {
  const shouldShowOverlay = Boolean(title) || Boolean(description);
  const [isOverlayVisible, setIsOverlayVisible] = useState(showOverlay);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  const overlayRef = useHandleClickOutside(closeOverlay, isOverlayVisible);
  const width = image?.width ?? undefined;
  const height = image?.height ?? undefined;

  return (
    <figure
      ref={overlayRef}
      className="relative overflow-hidden rounded-lg md:rounded-xl"
    >
      {image?.src && width && height ? (
        <Image
          src={image.src}
          alt={image.alt ?? ''}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
        />
      ) : null}

      {/* TODD: Support Video */}

      {/* Toggle button */}
      {shouldShowOverlay && (
        <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center">
          {isOverlayVisible ? (
            <SurfaceInteractiveGlass asChild>
              <button
                onClick={toggleOverlay}
                className="rounded-full p-1"
                aria-label="Hide information"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </SurfaceInteractiveGlass>
          ) : (
            <button
              onClick={toggleOverlay}
              className="rounded-full opacity-70 transition-opacity duration-200 hover:opacity-100"
              aria-label="Show information"
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      <AnimatePresence>
        {isOverlayVisible && shouldShowOverlay && (
          <AnimateSlide
            direction="up"
            key="overlay"
            transition={{ type: 'spring', bounce: 0.1 }}
          >
            <figcaption
              className={cn(
                surfaceVariants({ variant: 'glass' }),
                'absolute right-0 bottom-0 w-full p-4',
              )}
            >
              {title ? <h3 className="mb-2 font-medium">{title}</h3> : null}
              {description ? (
                <Prose className="prose-sm text-xs">{description}</Prose>
              ) : null}
            </figcaption>
          </AnimateSlide>
        )}
      </AnimatePresence>
    </figure>
  );
};

export default MediaAsset;
