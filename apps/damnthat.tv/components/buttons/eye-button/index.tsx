import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { EyeMan } from './eye-man';

type EyeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isEyeActive: boolean;
};

export const EyeButton = (props: EyeButtonProps) => {
  const { isEyeActive, className, ...rest } = props;

  return (
    <button
      className={clsx(
        props.className,
        'h-16 w-16 px-2.5 text-slate-800 dark:text-slate-100 [&.selected]:bg-peach [&.selected]:shadow-hard [&.selected]:dark:bg-club',
        'shadow-slate-800 hover:scale-[1.05] hover:bg-cream hover:shadow-hard dark:shadow-slate-950 dark:hover:bg-slate-600',
        'transition-all duration-300',
        {
          ['selected']: props.isEyeActive,
        },
      )}
      {...rest}
    >
      <EyeMan active={props.isEyeActive} />
    </button>
  );
};
