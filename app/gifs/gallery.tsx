'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGalleryContext } from './components/gallery-context-provider/index';
import { useCycleIndex } from '../../hooks/use-cycle-index';
import { GalleryImage } from './components/image';
import { Directions, DraggableSlide } from './components/draggable-slide';
import { FooterNav } from './components/footer-nav';
import { ActionIndicator } from './components/action-indicator';
import { HeaderNav } from './components/header-nav';
import { SurfaceBackground } from '@/components/surface';

export function GalleryRoute() {
  const images = useGalleryContext();
  const indexController = useCycleIndex(images?.length ?? 0);
  const [currentDirection, setCurrentDirection] = useState<Directions>();
  const [decidedDirection, setDecidedDirection] = useState<Directions>();
  const currentImage = images?.[indexController.index];

  const resetDirections = () => {
    setCurrentDirection(undefined);
    setDecidedDirection(undefined);
  };

  const handleDecisionComplete = () => {
    indexController.next();
    resetDirections();
  };

  if (!currentImage) return null;

  return (
    <section className="fixed inset-0 h-full w-full select-none">
      <HeaderNav
        title={currentImage.title || currentImage.username}
        externalLink={currentImage.url}
        current={indexController.index}
        length={images.length}
      />
      <SurfaceBackground asChild>
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden p-2">
          <AnimatePresence>
            <motion.div
              key={currentImage.id}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  delay: 0.5,
                  type: 'spring',
                  damping: 50,
                  stiffness: 200,
                },
              }}
              exit={{ opacity: 0, scale: 1.25, position: 'absolute' }}
            >
              <DraggableSlide
                onNoThrow={() => setCurrentDirection(undefined)}
                onDecidedDrag={(direction) => {
                  // console.log("decided drag", direction);
                  setCurrentDirection(direction);
                }}
                onThrowBegin={(direction) => {
                  // console.log("throw begin", direction);
                  setDecidedDirection(direction);
                }}
                minXDragDistance={50}
              >
                <GalleryImage
                  src={currentImage.images.original.url}
                  smallImageSrc={
                    currentImage.images.fixed_width_small_still.url
                  }
                  width={parseInt(currentImage.images.original.width)}
                  height={parseInt(currentImage.images.original.height)}
                  alt={currentImage.title}
                />
              </DraggableSlide>
            </motion.div>
          </AnimatePresence>
        </div>
      </SurfaceBackground>
      <AnimatePresence>
        {decidedDirection && (
          <ActionIndicator
            onComplete={handleDecisionComplete}
            direction={decidedDirection}
          />
        )}
      </AnimatePresence>
      <FooterNav
        isTrashed={currentDirection === Directions.LEFT}
        isLiked={currentDirection === Directions.RIGHT}
      />
    </section>
  );
}
