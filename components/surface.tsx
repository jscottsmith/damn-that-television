import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from './slot';

export const PRIMARY_SURFACE_CLASS = 'bg-white dark:bg-slate-800';
export const SECONDARY_SURFACE_CLASS = 'bg-slate-100 dark:bg-slate-700';
export const SURFACE_BACKGROUND_CLASS = 'bg-slate-200 dark:bg-slate-900';
export const SURFACE_GROUP_CLASS =
  'border border-slate-200 dark:border-slate-800';

export function SurfacePrimary({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(PRIMARY_SURFACE_CLASS, className)}
      {...props}
    />
  );
}

export function SurfaceSecondary({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(SECONDARY_SURFACE_CLASS, className)}
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

export function SurfaceGroup({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(SURFACE_GROUP_CLASS, className)}
      {...props}
    />
  );
}

export function SurfacePattern({ className, ...props }: SlotComponentProps) {
  return (
    <SlotComponent
      style={{ backgroundSize: '5rem 5rem' }}
      className={clsx(
        SURFACE_BACKGROUND_CLASS,
        className,
        `bg-[url('/static/pattern-1.svg')] dark:bg-[url('/static/pattern-0.svg')]`,
      )}
      {...props}
    />
  );
}
