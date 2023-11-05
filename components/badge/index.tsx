import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  className?: string;
  background?: string;
}>;

export const Badge = (props: Props) => {
  const background = props.background || 'bg-gray-100';
  return (
    <p
      className={clsx(
        props.className,
        background,
        'inline-block rounded-md px-sm py-0.5 text-sm font-medium text-lunar',
      )}
    >
      {props.children}
    </p>
  );
};
