import clsx from 'clsx';
import { SHARED_TEXT_CLASSNAME } from './constants';
import { SlotComponent, SlotComponentProps } from '../slot';

type TitleProps = SlotComponentProps & {
  size?: TitleSizes;
};

export enum TitleSize {
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  default = 'default',
}

type TitleSizes = keyof typeof TitleSize;

export const DEFAULT_TEXT_CLASSNAME = clsx('font-bold', SHARED_TEXT_CLASSNAME);

export const MAP_TITLE_SIZE_CLASSNAME = {
  [TitleSize.xl]: 'text-4xl md:text-5xl',
  [TitleSize.lg]: 'text-3xl md:text-4xl',
  [TitleSize.md]: 'text-2xl md:text-3xl',
  [TitleSize.default]: 'text-xl md:text-2xl',
};

function getTitleSizeStyle(size: TitleSizes) {
  return MAP_TITLE_SIZE_CLASSNAME[size];
}

export function Title({
  size = TitleSize.default,
  className,
  ...props
}: TitleProps) {
  return (
    <SlotComponent
      as="h1"
      className={clsx(
        getTitleSizeStyle(size),
        DEFAULT_TEXT_CLASSNAME,
        className,
      )}
      {...props}
    />
  );
}
