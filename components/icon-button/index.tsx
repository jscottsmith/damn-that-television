import Background from 'canvas/common/Background';
import clsx from 'clsx';
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
      className={clsx(
        className,
        background,
        'flex items-center justify-center rounded-full p-sm',
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
