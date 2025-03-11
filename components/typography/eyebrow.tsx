import clsx from 'clsx';
import React from 'react';
import { Label } from './label';

export function Eyebrow({ className, ...props }) {
  return <Label {...props} className={clsx('text-sm uppercase', className)} />;
}
