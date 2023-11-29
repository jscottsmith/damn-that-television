import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Label } from '../typography/label';

export enum ButtonSize {
  sm = 'sm',
  base = 'base',
  md = 'md',
}

export enum ButtonName {
  primary = 'primary',
  secondary = 'secondary',
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
    // dark
    'dark:text-deep dark:bg-slate-200 dark:hover:bg-club',
  ),
  [ButtonName.secondary]:
    'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600',
};

const BUTTON_SIZE_MAP = {
  [ButtonSize.sm]: 'rounded-md py-xs px-sm gap-1 text-sm',
  [ButtonSize.base]: 'rounded-md py-sm px-md gap-sm',
  [ButtonSize.md]: 'rounded-lg py-base px-lg gap-base text-lg',
};

const ICON_SIZE_MAP = {
  [ButtonSize.sm]: 'w-4 h-4',
  [ButtonSize.base]: 'w-5 h-5',
  [ButtonSize.md]: 'w-6 h-6',
};

function mapNameToClassName(size: ButtonNames) {
  return BUTTON_NAME_MAP[size];
}

function mapSizeToClassName(size: ButtonSizes) {
  return BUTTON_SIZE_MAP[size];
}

function mapSizeToIconClassName(size: ButtonSizes) {
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
          'items-center inline-flex whitespace-nowrap',
          // color
          'shadow-slate-700 dark:shadow-slate-900',
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
            <span
              className={clsx('block shrink-0', mapSizeToIconClassName(size))}
            >
              {icon}
            </span>
          </span>
        )}
      </button>
    </Label>
  );
};