import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SurfacePrimary, SurfaceSecondary } from './surface';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        className,
        // text-color controls shadow color
        'text-slate-700 dark:text-slate-950 shadow-hard',
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function CardPrimary({ children, ...props }: CardProps) {
  return (
    <SurfacePrimary asChild>
      <Card {...props}>{children}</Card>
    </SurfacePrimary>
  );
}

export function CardSecondary({ children, ...props }: CardProps) {
  return (
    <SurfaceSecondary asChild>
      <Card {...props}>{children}</Card>
    </SurfaceSecondary>
  );
}
