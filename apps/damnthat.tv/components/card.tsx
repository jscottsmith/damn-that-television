import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SurfacePrimary, SurfaceSecondary } from './surface';
import { SlotComponent, SlotComponentProps } from './slot';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        className,
        // text-color controls shadow color
        'shadow-hard shadow-slate-700 dark:shadow-slate-950',
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

export function CardPadding({
  children,
  className,
  ...props
}: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(className, 'p-base md:p-lg lg:p-xl')}
      {...props}
    >
      {children}
    </SlotComponent>
  );
}
