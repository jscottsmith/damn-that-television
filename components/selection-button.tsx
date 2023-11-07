import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  ReactComponentElement,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import { Label } from './typography/label';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

type SelectionButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected: boolean;
  icon?: ReactNode;
};

export const SelectionButton = (props: SelectionButton) => {
  const { className, isSelected, icon, ...rest } = props;
  return (
    <Label asChild>
      <button
        className={clsx(
          'rounded-md py-sm px-md items-center inline-flex gap-sm whitespace-nowrap',
          'shadow-slate-700 dark:shadow-slate-500',
          'hover:shadow-hard-sm hover:-translate-x-1 hover:-translate-y-1',
          'transition-all duration-300',
          isSelected
            ? 'bg-club hover:bg-club-600 text-white shadow-hard-sm -translate-x-1 -translate-y-1'
            : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-900',
        )}
        {...rest}
      >
        {props.children}
        <span
          className={clsx(
            'p-1 rounded-full shrink-0',
            isSelected && 'bg-club-700',
          )}
        >
          <span className="block w-5 h-5 shrink-0">
            {isSelected ? <CheckIcon /> : icon ?? <XMarkIcon />}
          </span>
        </span>
      </button>
    </Label>
  );
};
