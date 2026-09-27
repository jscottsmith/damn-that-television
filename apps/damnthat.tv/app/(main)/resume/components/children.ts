import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

export function elementsOfType<Props>(
  children: ReactNode,
  type: (props: Props) => ReactNode,
): ReactElement<Props>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<Props> =>
      isValidElement(child) && child.type === type,
  );
}

export function contentBeside<Props>(
  children: ReactNode,
  type: (props: Props) => ReactNode,
): ReactNode[] {
  return Children.toArray(children).filter((child) => {
    if (typeof child === 'string') {
      return child.trim().length > 0;
    }

    return !(isValidElement(child) && child.type === type);
  });
}
