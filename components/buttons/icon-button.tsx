import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { IconContainer } from '../icon-container';
import { SurfaceInteractive } from '../surface-interactive';

export enum IconButtonSize {
  sm = 'sm',
  base = 'base',
  md = 'md',
}

export enum IconButtonName {
  primary = 'primary',
  secondary = 'secondary',
}

export type IconButtonSizes = keyof typeof IconButtonSize;
export type IconButtonNames = keyof typeof IconButtonName;

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  iconContainerClassName?: string;
  size?: IconButtonSizes;
  name?: IconButtonName;
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
    <SurfaceInteractive asChild>
      <button
        className={clsx(
          className,
          mapSizeToClassName(size),

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
        {...rest}
      >
        <IconContainer>{props.children}</IconContainer>
      </button>
    </SurfaceInteractive>
  );
};
