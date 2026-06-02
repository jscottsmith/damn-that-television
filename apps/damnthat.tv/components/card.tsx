import React, { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
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

export function CardPrimary({ children, className, ...props }: CardProps) {
  return (
    <Card
      className={cn(surfaceVariants({ variant: 'primary' }), className)}
      {...props}
    >
      {children}
    </Card>
  );
}

export function CardSecondary({ children, className, ...props }: CardProps) {
  return (
    <Card
      className={cn(surfaceVariants({ variant: 'secondary' }), className)}
      {...props}
    >
      {children}
    </Card>
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
