import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Label } from '../typography/label';
import { IconContainer, IconContainerSize } from '../icon-container';
import { SURFACE_INTERACTIVE } from '../surface-interactive';
import { SystemStatus } from '../types';

export enum ButtonSize {
  sm = 'sm',
  base = 'base',
  md = 'md',
}

export enum ButtonName {
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

export type ButtonSizes = keyof typeof ButtonSize;
export type ButtonNames = keyof typeof ButtonName;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  iconContainerClassName?: string;
  size?: ButtonSizes;
  name?: ButtonName;
};

const BUTTON_NAME_MAP = {
  [ButtonName.primary]: clsx(
    'text-white bg-slate-800 hover:bg-club',
    'dark:text-slate-800 dark:bg-slate-200 dark:hover:bg-club',
  ),
  [ButtonName.secondary]: SURFACE_INTERACTIVE,
  [ButtonName.warning]: clsx(
    'text-white bg-orange-500 hover:bg-orange-600',
    'dark:text-orange-950 dark:hover:bg-orange-400',
  ),
  [ButtonName.danger]: clsx(
    'text-white bg-rose-500 hover:bg-rose-600',
    'dark:text-rose-950 dark:hover:bg-rose-400',
  ),
  [ButtonName.info]: clsx(
    'text-white bg-sky-500 hover:bg-sky-600',
    'dark:text-sky-950 dark:hover:bg-sky-400',
  ),
  [ButtonName.success]: clsx(
    'text-white bg-teal-500 hover:bg-teal-600',
    'dark:text-teal-950 dark:hover:bg-teal-400',
  ),
};

const BUTTON_SIZE_MAP = {
  [ButtonSize.sm]: 'rounded-md py-xs px-sm gap-1 text-sm',
  [ButtonSize.base]: 'rounded-md py-sm px-md gap-sm',
  [ButtonSize.md]: 'rounded-lg py-base px-lg gap-base text-lg',
};

const ICON_SIZE_MAP = {
  [ButtonSize.sm]: IconContainerSize.sm,
  [ButtonSize.base]: IconContainerSize.base,
  [ButtonSize.md]: IconContainerSize.md,
};

function mapNameToClassName(size: ButtonNames) {
  return BUTTON_NAME_MAP[size];
}

function mapSizeToClassName(size: ButtonSizes) {
  return BUTTON_SIZE_MAP[size];
}

function mapSizeToIconSize(size: ButtonSizes) {
  return ICON_SIZE_MAP[size];
}

export const Button = (props: ButtonProps) => {
  const {
    size = ButtonSize.base,
    name = ButtonName.secondary,
    className,
    iconContainerClassName,
    icon,
    ...rest
  } = props;
  return (
    <Label asChild>
      <button
        className={clsx(
          className,
          mapSizeToClassName(size),
          mapNameToClassName(name),
          'items-center inline-flex justify-between whitespace-nowrap',
          // color
          'shadow-slate-700 dark:shadow-slate-950',
          // hover
          'hover:shadow-hard-xs hover:-translate-x-0.5 hover:-translate-y-0.5',
          // active
          'hover:active:shadow-none hover:active:translate-x-0 hover:active:translate-y-0 active:duration-100',
          // transition
          'transition-[box-shadow,color,transform] duration-200',
        )}
        {...rest}
      >
        {props.children}
        {icon && (
          <span
            className={clsx(
              'p-1 rounded-full shrink-0',
              iconContainerClassName,
            )}
          >
            <IconContainer size={mapSizeToIconSize(size)}>{icon}</IconContainer>
          </span>
        )}
      </button>
    </Label>
  );
};
