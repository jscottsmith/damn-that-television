'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { useState } from 'react';
import { SurfaceInteractiveGlass } from './surface-interactive';
import { SURFACE_GLASS, SurfacePrimary } from './surface';
import clsx from 'clsx';
import { Prose } from './typography/prose';
import { AnimatePresence } from 'motion/react';
import { AnimateSlide } from './animations/animate-slide';

interface MediaAssetProps {
  image?: any;
  title?: string;
  description?: any;
  showOverlay?: boolean;
}

/**
 * Component for rendering a single media asset with optional title and description overlay.
 */
const MediaAsset: React.FC<MediaAssetProps> = ({
  image,
  title,
  description,
  showOverlay = false,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(showOverlay);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <figure className="relative overflow-hidden rounded-xl">
      {image && (
        <PrismicNextImage
          field={image}
          className="h-auto w-full object-cover"
        />
      )}

      {/* TODD: Support Video */}

      {/* Toggle button */}
      {(title || description) && (
        <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center">
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
        {isOverlayVisible && (title || description) && (
          <AnimateSlide
            direction="up"
            key="overlay"
            transition={{ type: 'spring', bounce: 0.1 }}
          >
            <SurfacePrimary asChild>
              <figcaption
                className={clsx(
                  'absolute bottom-0 right-0 w-full p-4',
                  SURFACE_GLASS,
                )}
              >
                {title && <h3 className="mb-2 font-medium">{title}</h3>}
                {description && (
                  <Prose className="prose-sm text-xs">
                    <PrismicRichText field={description} />
                  </Prose>
                )}
              </figcaption>
            </SurfacePrimary>
          </AnimateSlide>
        )}
      </AnimatePresence>
    </figure>
  );
};

export default MediaAsset;
