import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type SurfaceProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const DEFAULT_SURFACE_CLASS = 'bg-slate-100 dark:bg-slate-700';

export function Surface({ className, ...props }: SurfaceProps) {
  return (
    <div className={clsx(className, DEFAULT_SURFACE_CLASS)} {...props}>
      {props.children}
    </div>
  );
}

export const SURFACE_BACKGROUND_CLASS = 'bg-slate-200 dark:bg-slate-800';

export function SurfaceBackground({ className, ...props }: SurfaceProps) {
  return (
    <div className={clsx(className, SURFACE_BACKGROUND_CLASS)} {...props}>
      {props.children}
    </div>
  );
}
