import { HTMLAttributes } from 'react';
import { AsChildProps, Slot } from '../slot';
import { SHARED_TEXT_CLASSNAME } from './constants';
import clsx from 'clsx';

type LabelProps = AsChildProps<HTMLAttributes<HTMLParagraphElement>> & {
  className?: string;
};

export const DEFAULT_TEXT_CLASSNAME = clsx(
  'font-bold font-poppins text-base',
  SHARED_TEXT_CLASSNAME,
);

export function Label({ asChild, className, ...props }: LabelProps) {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp {...props} className={clsx(DEFAULT_TEXT_CLASSNAME, className)} />
  );
}
