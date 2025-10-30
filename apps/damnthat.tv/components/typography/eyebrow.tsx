import clsx from 'clsx';
import React from 'react';
import { Label, LabelProps } from './label';

export type EyebrowProps = LabelProps;

export function Eyebrow({ className, ...props }: EyebrowProps) {
  return <Label {...props} className={clsx('text-sm uppercase', className)} />;
}
