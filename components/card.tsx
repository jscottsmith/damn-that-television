import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  backgroundColor?: string;
};

export function Card({
  backgroundColor = 'bg-ghost',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(className, 'text-deep shadow-hard', backgroundColor)}
      {...props}
    >
      {props.children}
    </div>
  );
}

export const CardGhost = Card;

export const CardMiami = (props: CardProps) => <Card backgroundColor="bg-miami" {...props} />;
