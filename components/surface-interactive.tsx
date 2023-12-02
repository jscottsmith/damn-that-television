import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from './slot';

export const SURFACE_INTERACTIVE =
  'bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-600';

export function SurfaceInteractive({
  className,
  ...props
}: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(SURFACE_INTERACTIVE, className)}
      {...props}
    />
  );
}
