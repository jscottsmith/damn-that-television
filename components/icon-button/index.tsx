import clsx from 'clsx';
import { PropsWithChildren,ButtonHTMLAttributes } from 'react';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
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
