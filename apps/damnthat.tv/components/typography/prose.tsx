import React from 'react';
import { SlotComponent, SlotComponentProps } from '../slot';
import clsx from 'clsx';

export function Prose({ children, className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx('prose prose-slate dark:prose-invert', className)}
      {...props}
    >
      {children}
    </SlotComponent>
  );
}
