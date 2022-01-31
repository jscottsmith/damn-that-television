import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

type Props = PropsWithChildren<{
  className?: string;
  background?: string;
}>;

export const Badge = (props: Props) => {
  const background = props.background || 'bg-gray-100';
  return (
    <p
      className={cx(
        props.className,
        background,
        'inline-block px-sm py-0.5 text-sm text-lunar rounded-md font-medium',
      )}
    >
      {props.children}
    </p>
  );
};
