import React, { PropsWithChildren } from 'react';
import { SlotComponent } from './slot';
import clsx from 'clsx';

export enum IconContainerSize {
  sm = 'sm',
  base = 'base',
  md = 'md',
}

export type IconContainerSizes = keyof typeof IconContainerSize;

const ICON_SIZE_MAP = {
  [IconContainerSize.sm]: 'w-4 h-4',
  [IconContainerSize.base]: 'w-5 h-5',
  [IconContainerSize.md]: 'w-6 h-6',
};

function mapSizeToClassName(size: IconContainerSizes) {
  return ICON_SIZE_MAP[size];
}

export function IconContainer({
  size = IconContainerSize.base,
  children,
}: PropsWithChildren<{ size?: IconContainerSizes }>) {
  return (
    <SlotComponent
      className={clsx('block shrink-0', mapSizeToClassName(size))}
      asChild
    >
      {children}
    </SlotComponent>
  );
}
