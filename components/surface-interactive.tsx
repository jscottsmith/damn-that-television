import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from './slot';
import { SystemStatus } from './types';

export enum SurfaceInteractiveName {
  primary = 'primary',
  secondary = 'secondary',
  /**
   * System Buttons
   */
  warning = SystemStatus.warning,
  success = SystemStatus.success,
  info = SystemStatus.info,
  danger = SystemStatus.danger,
}

export type SurfaceInteractiveNames = keyof typeof SurfaceInteractiveName;

export const SURFACE_INTERACTIVE =
  'bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-600';

const SURFACE_INTERACTIVE_NAME_MAP = {
  [SurfaceInteractiveName.primary]: clsx(
    'text-white bg-slate-800 hover:bg-club',
    'dark:text-slate-800 dark:bg-slate-200 dark:hover:bg-club',
  ),
  [SurfaceInteractiveName.secondary]: SURFACE_INTERACTIVE,
  [SurfaceInteractiveName.warning]: clsx(
    'text-white bg-orange-500 hover:bg-orange-600',
    'dark:text-orange-950 dark:hover:bg-orange-400',
  ),
  [SurfaceInteractiveName.danger]: clsx(
    'text-white bg-rose-500 hover:bg-rose-600',
    'dark:text-rose-950 dark:hover:bg-rose-400',
  ),
  [SurfaceInteractiveName.info]: clsx(
    'text-white bg-sky-500 hover:bg-sky-600',
    'dark:text-sky-950 dark:hover:bg-sky-400',
  ),
  [SurfaceInteractiveName.success]: clsx(
    'text-white bg-teal-500 hover:bg-teal-600',
    'dark:text-teal-950 dark:hover:bg-teal-400',
  ),
};

function mapNameToClassName(size: SurfaceInteractiveNames) {
  return SURFACE_INTERACTIVE_NAME_MAP[size];
}

export type SurfaceInteractiveProps = SlotComponentProps & {
  name?: SurfaceInteractiveNames;
};

export function SurfaceInteractive({
  name = SurfaceInteractiveName.secondary,
  className,
  ...props
}: SurfaceInteractiveProps) {
  return (
    <SlotComponent
      className={clsx(
        mapNameToClassName(name),
        className,
        'items-center inline-flex rounded-full',
        // color
        'shadow-slate-700 dark:shadow-slate-950',
        // hover
        'hover:shadow-hard-xs hover:-translate-x-0.5 hover:-translate-y-0.5',
        // active
        'hover:active:shadow-none hover:active:translate-x-0 hover:active:translate-y-0 active:duration-100',
        // transition
        'transition-[box-shadow,color,transform] duration-200',
      )}
      {...props}
    />
  );
}
