import clsx from 'clsx';
import React, { Children, ReactElement, cloneElement } from 'react';
import { SlotComponent } from '../slot';
import { ButtonProps } from './button';

type ButtonGroupProps = {
  children: ReactElement<ButtonProps> | Array<ReactElement<ButtonProps>>;
  className?: string;
  vertical?: boolean;
};

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <SlotComponent
      className={clsx(
        'flex gap-0.5',
        props.className,
        props.vertical && 'flex-col',
      )}
    >
      {Children.map(props.children, (child) => {
        return cloneElement(child, {
          className: clsx(
            props.vertical
              ? '[&:not(:last-child)]:rounded-b-none [&:not(:first-child)]:rounded-t-none'
              : '[&:not(:last-child)]:rounded-r-none [&:not(:first-child)]:rounded-l-none',
            child.props.className,
          ),
        });
      })}
    </SlotComponent>
  );
}
