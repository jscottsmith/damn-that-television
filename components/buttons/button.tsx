import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Label } from '../typography/label';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  iconContainerClassName?: string;
};

export const Button = (props: ButtonProps) => {
  const { className, icon, iconContainerClassName, ...rest } = props;
  return (
    <Label asChild>
      <button
        className={clsx(
          className,
          'rounded-md py-sm px-md items-center inline-flex gap-sm whitespace-nowrap',
          'shadow-slate-700 dark:shadow-slate-900',
          'hover:shadow-hard-sm hover:-translate-x-1 hover:-translate-y-1',
          'hover:active:shadow-none hover:active:translate-x-0 hover:active:translate-y-0 active:duration-100',
          'transition-all duration-200',
          'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600',
        )}
        {...rest}
      >
        {props.children}
        {icon && (
          <span
            className={clsx(
              'p-1 rounded-full shrink-0',
              iconContainerClassName,
            )}
          >
            <span className="block w-5 h-5 shrink-0">{icon}</span>
          </span>
        )}
      </button>
    </Label>
  );
};
