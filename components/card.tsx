import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { DEFAULT_SURFACE_CLASS } from './surface';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  surface?: string;
};

export function Card({
  surface = DEFAULT_SURFACE_CLASS,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        className,
        // text-color controls shadow color
        'text-slate-700 dark:text-slate-950 shadow-hard',
        surface,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export const CardGhost = Card;

export const CardMiami = (props: CardProps) => (
  <Card surface="bg-miami" {...props} />
);
