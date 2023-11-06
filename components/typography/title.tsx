import { HTMLAttributes } from 'react';
import { AsChildProps, Slot } from '../slot';
import { SHARED_TEXT_CLASSNAME } from './constants';
import clsx from 'clsx';

type TitleProps = AsChildProps<HTMLAttributes<HTMLHeadingElement>> & {
  className?: string;
};

export const DEFAULT_TEXT_CLASSNAME = clsx(
  'font-bold text-xl md:text-2xl mb-base md:mb-lg',
  SHARED_TEXT_CLASSNAME,
);
export function Title({ asChild, className, ...props }: TitleProps) {
  const Comp = asChild ? Slot : 'h1';
  return (
    <Comp {...props} className={clsx(DEFAULT_TEXT_CLASSNAME, className)} />
  );
}
