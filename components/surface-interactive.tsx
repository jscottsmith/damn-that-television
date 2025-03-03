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

const SHARED_SHADOW_COLOR = 'shadow-slate-700 dark:shadow-slate-600';

export const SURFACE_INTERACTIVE = clsx(
  'bg-slate-200 hocus:bg-slate-300',
  'dark:bg-slate-900 dark:hocus:bg-slate-600',
  SHARED_SHADOW_COLOR,
);

const SURFACE_INTERACTIVE_NAME_MAP = {
  [SurfaceInteractiveName.primary]: clsx(
    'text-white bg-slate-800 hocus:bg-club',
    'dark:text-slate-800 dark:bg-slate-200 dark:hocus:bg-club',
    'shadow-club',
  ),
  [SurfaceInteractiveName.secondary]: SURFACE_INTERACTIVE,
  [SurfaceInteractiveName.warning]: clsx(
    'text-white bg-orange-500 hocus:bg-orange-600',
    'dark:text-orange-950 dark:hocus:bg-orange-400',
    SHARED_SHADOW_COLOR,
  ),
  [SurfaceInteractiveName.danger]: clsx(
    'text-white bg-rose-500 hocus:bg-rose-600',
    'dark:text-rose-950 dark:hocus:bg-rose-400',
    SHARED_SHADOW_COLOR,
  ),
  [SurfaceInteractiveName.info]: clsx(
    'text-white bg-sky-500 hocus:bg-sky-600',
    'dark:text-sky-950 dark:hocus:bg-sky-400',
    SHARED_SHADOW_COLOR,
  ),
  [SurfaceInteractiveName.success]: clsx(
    'text-white bg-teal-500 hocus:bg-teal-600',
    'dark:text-teal-950 dark:hocus:bg-teal-400',
    SHARED_SHADOW_COLOR,
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
        'inline-flex items-center rounded-full',

        // hover
        'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-xs',
        // focus
        'focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-hard-xs focus:outline-none',
        // active
        'active:duration-100 hover:active:translate-x-0 hover:active:translate-y-0 hover:active:shadow-none',
        // transition
        'transition-[box-shadow,color,transform] duration-200',
      )}
      {...props}
    />
  );
}
