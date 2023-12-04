import clsx from 'clsx';
import React, { Children, ReactElement, cloneElement } from 'react';
import { SlotComponent } from '../slot';
import { ButtonProps } from './button';

export function ButtonGroup({
  className,
  children,
}: {
  children: ReactElement<ButtonProps> | Array<ReactElement<ButtonProps>>;
  className?: string;
}) {
  return (
    <SlotComponent className={clsx('flex gap-0.5', className)}>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          className: clsx(
            '[&:not(:last-child)]:rounded-r-none [&:not(:first-child)]:rounded-l-none',
            child.props.className,
          ),
        });
      })}
    </SlotComponent>
  );
}
