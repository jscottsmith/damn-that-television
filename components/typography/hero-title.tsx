import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { AsChildProps, Slot } from '../slot';

type HeroTitleProps = AsChildProps<HTMLAttributes<HTMLHeadingElement>> & {
  className?: string;
};

export const DEFAULT_HERO_TEXT_CLASSNAME = clsx(
  'font-futura font-black italic uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl',
  'text-deep dark:text-white',
);

export function HeroTitle({ asChild, className, ...props }: HeroTitleProps) {
  const Comp = asChild ? Slot : 'h1';
  return (
    <Comp {...props} className={clsx(DEFAULT_HERO_TEXT_CLASSNAME, className)} />
  );
}
