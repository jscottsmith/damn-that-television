import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SlotComponent } from '../slot';

export enum BadgeType {
  default = 'default',
  primary = 'primary',
}

type BadgeTypes = keyof typeof BadgeType;

const MAP_TYPE_TO_CLASS = {
  [BadgeType.default]:
    'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800',
  [BadgeType.primary]:
    'border-soft-pink-500 dark:border-pepto-800 text-slate-800 dark:text-slate-100 bg-soft-pink-400 dark:bg-pepto-900',
};

type BadgeProps = PropsWithChildren<{
  className?: string;
  background?: string;
  type?: BadgeTypes;
}>;

function getClassByType(type: BadgeTypes) {
  return MAP_TYPE_TO_CLASS[type];
}

export const Badge = ({ type = BadgeType.default, ...props }: BadgeProps) => {
  return (
    <SlotComponent
      as="p"
      className={clsx(
        props.className,
        'inline-block rounded-md px-sm py-0.5',
        'text-xs md:text-sm font-medium border',
        getClassByType(type),
      )}
    >
      {props.children}
    </SlotComponent>
  );
};
