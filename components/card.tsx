import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

export function Card({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(className, 'bg-ghost text-deep shadow-hard')}
      {...props}
    >
      {props.children}
    </div>
  );
}
