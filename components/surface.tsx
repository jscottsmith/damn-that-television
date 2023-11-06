import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { AsChildProps, Slot } from './slot';

export const WHITE_SURFACE_CLASS = 'bg-white dark:bg-slate-900';

type SurfacePrimaryProps = AsChildProps<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
};

export function SurfacePrimary({
  asChild,
  className,
  ...props
}: SurfacePrimaryProps) {
  const Comp = asChild ? Slot : 'div';
  return <Comp {...props} className={clsx(WHITE_SURFACE_CLASS, className)} />;
}

export const DEFAULT_SURFACE_CLASS = 'bg-slate-100 dark:bg-slate-700';

type SurfaceSecondaryProps = AsChildProps<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
};

export function SurfaceSecondary({
  asChild,
  className,
  ...props
}: SurfaceSecondaryProps) {
  const Comp = asChild ? Slot : 'div';
  return <Comp {...props} className={clsx(DEFAULT_SURFACE_CLASS, className)} />;
}

export const SURFACE_BACKGROUND_CLASS = 'bg-slate-200 dark:bg-slate-800';

type SurfaceBackgroundProps = AsChildProps<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
};

export function SurfaceBackground({
  asChild,
  className,
  ...props
}: SurfaceBackgroundProps) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp {...props} className={clsx(SURFACE_BACKGROUND_CLASS, className)} />
  );
}
