import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { IconContainer } from '../icon-container';
import { SurfaceInteractive } from '../surface-interactive';
import { SystemStatus } from '../types';

export enum IconButtonSize {
  sm = 'sm',
  base = 'base',
  md = 'md',
}

export enum IconButtonName {
  primary = 'primary',
  secondary = 'secondary',
  warning = SystemStatus.warning,
  success = SystemStatus.success,
  info = SystemStatus.info,
  danger = SystemStatus.danger,
}

export type IconButtonSizes = keyof typeof IconButtonSize;
export type IconButtonNames = keyof typeof IconButtonName;

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  iconContainerClassName?: string;
  size?: IconButtonSizes;
  name?: IconButtonNames;
};

const BUTTON_SIZE_MAP = {
  [IconButtonSize.sm]: 'p-sm',
  [IconButtonSize.base]: 'p-base',
  [IconButtonSize.md]: 'p-md',
};

function mapSizeToClassName(size: IconButtonSizes) {
  return BUTTON_SIZE_MAP[size];
}

export const IconButton = (props: IconButtonProps) => {
  const {
    size = IconButtonSize.base,
    name = IconButtonName.secondary,
    className,
    iconContainerClassName,
    icon,
    ...rest
  } = props;
  return (
    <SurfaceInteractive name={name} asChild>
      <button className={clsx(className, mapSizeToClassName(size))} {...rest}>
        <IconContainer>{props.children}</IconContainer>
      </button>
    </SurfaceInteractive>
  );
};
