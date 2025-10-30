import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from '../slot';

type HeroTitleProps = SlotComponentProps & {
  size?: HeroTitleSizes;
};

export enum HeroTitleSize {
  lg = 'lg',
  md = 'md',
  default = 'default',
  sm = 'sm',
}

type HeroTitleSizes = keyof typeof HeroTitleSize;

export const DEFAULT_HERO_TEXT_CLASSNAME = clsx(
  'font-futura font-black italic uppercase',
  'text-deep dark:text-white',
);

export const MAP_HERO_TITLE_SIZE_CLASSNAME = {
  [HeroTitleSize.sm]:
    'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
  [HeroTitleSize.default]:
    'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  [HeroTitleSize.md]:
    'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  [HeroTitleSize.lg]:
    'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl',
};

function getHeroTitleSizeStyle(size: HeroTitleSizes) {
  return MAP_HERO_TITLE_SIZE_CLASSNAME[size];
}

export function HeroTitle({
  size = HeroTitleSize.default,
  className,
  ...props
}: HeroTitleProps) {
  return (
    <SlotComponent
      as="h1"
      className={clsx(
        getHeroTitleSizeStyle(size),
        DEFAULT_HERO_TEXT_CLASSNAME,
        className,
      )}
      {...props}
    />
  );
}
