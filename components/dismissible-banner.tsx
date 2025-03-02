import React, { PropsWithChildren, useState } from 'react';
import { useEffectOnce, useSessionStorage } from 'usehooks-ts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SurfaceSecondary } from './surface';
import { CardPadding } from './card';
import { IconButton } from './buttons/icon-button';
import { IconContainerSize } from './icon-container';
import { SlotComponentProps } from './slot';
import { AnimatePresence } from 'motion/react';
import { AnimateHeight, AnimateFlipDown } from './animations/animate-height';

type DismissibleBannerProps = PropsWithChildren<{
  id: string;
}> &
  SlotComponentProps;

function useDismissStorage(id: string) {
  const [isDismissed, setDismissed] = useSessionStorage(id, false);
  const [isMounted, setMounted] = useState(false);

  useEffectOnce(() => setMounted(true));

  function dismiss() {
    setDismissed(true);
  }

  return {
    dismiss,
    isDismissed: isMounted ? isDismissed : true,
  };
}

export function DismissibleBanner({
  children,
  className,
  id,
}: DismissibleBannerProps) {
  const { dismiss, isDismissed } = useDismissStorage(id);
  return (
    <AnimatePresence initial={false}>
      {!isDismissed && (
        <AnimateHeight key="height">
          <AnimateFlipDown key="flip">
            <SurfaceSecondary className={className} asChild>
              <CardPadding className="relative">
                <IconButton
                  size={IconContainerSize.sm}
                  className="absolute right-base top-base"
                  onClick={() => dismiss()}
                >
                  <XMarkIcon />
                </IconButton>
                {children}
              </CardPadding>
            </SurfaceSecondary>
          </AnimateFlipDown>
        </AnimateHeight>
      )}
    </AnimatePresence>
  );
}
