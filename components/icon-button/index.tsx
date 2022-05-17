import Background from 'canvas/common/Background';
import cx from 'classnames';
import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<{}> & {
    background?: string;
  }
>;

export const IconButton = (props: IconButtonProps) => {
  const {
    className,
    background = 'bg-gray-500 hover:bg-gray-700',
    ...rest
  } = props;
  return (
    <button
      className={cx(
        className,
        background,
        'p-sm flex items-center justify-center rounded-full',
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
