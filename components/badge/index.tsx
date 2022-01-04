import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const Badge = (props: Props) => {
  return (
    <p
      className={cx(
        props.className,
        'inline-block px-sm py-0.5 text-sm text-lunar bg-gray-100 rounded-md font-medium',
      )}
    >
      {props.children}
    </p>
  );
};
