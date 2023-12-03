import clsx from 'clsx';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  useEffectOnce,
  useIsMounted,
  useSessionStorage,
  useToggle,
} from 'usehooks-ts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SurfaceSecondary } from './surface';
import { CardPadding } from './card';
import { IconButton } from './buttons/icon-button';
import { IconContainerSize } from './icon-container';
import { SlotComponentProps } from './slot';

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
    <SurfaceSecondary
      className={clsx(className, isDismissed && 'hidden')}
      asChild
    >
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
  );
}
