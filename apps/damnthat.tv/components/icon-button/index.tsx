import clsx from 'clsx';
import { PropsWithChildren, ButtonHTMLAttributes } from 'react';

type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    background?: string;
  }
>;

export const IconButton = (props: IconButtonProps) => {
  const {
    className,
    background = 'bg-muted hover:bg-secondary',
    ...rest
  } = props;
  return (
    <button
      className={clsx(
        className,
        background,
        'p-2 flex items-center justify-center rounded-full',
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
