import { twMerge } from '@/helpers/tailwind-merge';
import * as React from 'react';

// Used instead of Polymorphic components
// https://www.jacobparis.com/content/react-as-child

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: React.ReactNode };

export function Slot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
}) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: twMerge(props.className, children.props.className),
    });
  }
  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }
  return null;
}
