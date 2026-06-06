import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@workspace/ui/components/button';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { CardPadding } from './card';
import { SlotComponentProps } from './slot';
import { AnimatePresence } from 'motion/react';
import { AnimateHeight, AnimateFlipDown } from './animations/animate-height';

type DismissibleBannerState = {
  dismiss: () => void;
  isDismissed: boolean;
};

type DismissibleBannerProps = {
  id: string;
  onDismiss?: () => void;
  children:
    | React.ReactNode
    | ((state: DismissibleBannerState) => React.ReactNode);
} & Omit<SlotComponentProps, 'children'>;

function useDismissStorage(id: string) {
  const [isDismissed, setDismissed] = useSessionStorage(id, false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
  onDismiss,
}: DismissibleBannerProps) {
  const { dismiss, isDismissed } = useDismissStorage(id);

  const handleDismiss = () => {
    dismiss();
    onDismiss?.();
  };

  const bannerState: DismissibleBannerState = {
    dismiss: handleDismiss,
    isDismissed,
  };

  // Check if children is a function (render prop) or regular React children
  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(bannerState);
    }
    return children;
  };

  return (
    <AnimatePresence initial={false}>
      {!isDismissed && (
        <AnimateHeight key="height">
          <AnimateFlipDown key="flip">
            <CardPadding
              className={cn(
                surfaceVariants({ variant: 'secondary' }),
                'relative',
                className,
              )}
            >
                <Button
                  presentation="icon"
                  size="sm"
                  className="right-base top-base absolute"
                  onClick={handleDismiss}
                >
                  <XMarkIcon />
                </Button>
                {renderChildren()}
            </CardPadding>
          </AnimateFlipDown>
        </AnimateHeight>
      )}
    </AnimatePresence>
  );
}
