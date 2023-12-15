import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from '../slot';

export enum BadgeSize {
  default = 'default',
  lg = 'lg',
}

export enum BadgeType {
  default = 'default',
  primary = 'primary',
}

type BadgeTypes = keyof typeof BadgeType;
type BadgeSizes = keyof typeof BadgeSize;

const MAP_TYPE_TO_CLASS = {
  [BadgeType.default]:
    'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800',
  [BadgeType.primary]:
    'border-none text-slate-800 dark:text-slate-100 bg-soft-pink-400 dark:bg-pepto-900',
};

const MAP_SIZE_TO_CLASS = {
  [BadgeSize.default]: 'px-sm py-0.5',
  [BadgeSize.lg]: 'px-base py-1',
};

type BadgeProps = PropsWithChildren<{
  background?: string;
  type?: BadgeTypes;
  size?: BadgeSizes;
}> &
  SlotComponentProps;

function getClassByType(type: BadgeTypes) {
  return MAP_TYPE_TO_CLASS[type];
}

function getClassBySize(size: BadgeSizes) {
  return MAP_SIZE_TO_CLASS[size];
}

export const Badge = ({
  type = BadgeType.default,
  size = BadgeSize.default,
  className,
  ...props
}: BadgeProps) => {
  return (
    <SlotComponent
      as="p"
      className={clsx(
        className,
        'inline-block rounded-md',
        'text-xs font-medium md:text-sm',

        getClassByType(type),
        getClassBySize(size),
      )}
      {...props}
    >
      {props.children}
    </SlotComponent>
  );
};
