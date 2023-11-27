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

export type SlotComponentProps = AsChildProps<
  React.HTMLAttributes<HTMLElement>
> & {
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  style?: React.CSSProperties;
};

export function SlotComponent({
  as = 'div',
  asChild,
  ...props
}: SlotComponentProps) {
  const Comp = asChild ? Slot : as;
  return <Comp {...props} />;
}
