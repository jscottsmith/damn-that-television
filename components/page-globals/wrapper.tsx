import React from 'react';
import { SlotComponent, SlotComponentProps } from '../slot';
import clsx from 'clsx';

export const WRAPPER_CLASS = 'px-4 sm:px-12 md:px-24 lg:px-36';

export function Wrapper({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent className={clsx(WRAPPER_CLASS, className)} {...props} />
  );
}
