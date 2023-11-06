import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { AsChildProps, Slot } from '../slot';
import { SHARED_TEXT_CLASSNAME } from './constants';

type HeroTitleProps = AsChildProps<HTMLAttributes<HTMLHeadingElement>> & {
  className?: string;
};

export const DEFAULT_HERO_TEXT_CLASSNAME = clsx(
  'font-black italic uppercase text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-lg md:mb-xl',
  SHARED_TEXT_CLASSNAME,
);

export function HeroTitle({ asChild, className, ...props }: HeroTitleProps) {
  const Comp = asChild ? Slot : 'h1';
  return (
    <Comp {...props} className={clsx(DEFAULT_HERO_TEXT_CLASSNAME, className)} />
  );
}
