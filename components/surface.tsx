import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from './slot';

export const WHITE_SURFACE_CLASS = 'bg-white dark:bg-slate-900';
export const DEFAULT_SURFACE_CLASS = 'bg-slate-100 dark:bg-slate-700';
export const SURFACE_BACKGROUND_CLASS = 'bg-slate-200 dark:bg-slate-800';

export function SurfacePrimary({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(WHITE_SURFACE_CLASS, className)}
      {...props}
    />
  );
}

export function SurfaceSecondary({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(DEFAULT_SURFACE_CLASS, className)}
      {...props}
    />
  );
}

export function SurfaceBackground({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(SURFACE_BACKGROUND_CLASS, className)}
      {...props}
    />
  );
}
