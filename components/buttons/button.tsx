import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Label } from '../typography/label';
import { IconContainer, IconContainerSize } from '../icon-container';
import { SurfaceInteractive } from '../surface-interactive';
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
    <SurfaceInteractive name={name} asChild>
      <Label asChild>
        <button
          className={clsx(
            className,
            mapSizeToClassName(size),
            'items-center inline-flex justify-between whitespace-nowrap',
          )}
          {...rest}
        >
          {props.children}
          {icon && (
            <span
              className={clsx(
                'ml-1 rounded-full shrink-0',
                iconContainerClassName,
              )}
            >
              <IconContainer size={mapSizeToIconSize(size)}>
                {icon}
              </IconContainer>
            </span>
          )}
        </button>
      </Label>
    </SurfaceInteractive>
  );
};
