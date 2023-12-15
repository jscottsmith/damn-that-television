import clsx from 'clsx';
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Label } from '../typography/label';

type InputToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function InputToggleUI({ label, ...props }: InputToggleProps, ref) {
  return (
    <label className="relative inline-flex cursor-pointer items-center overflow-hidden">
      <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
      <div
        className={clsx(
          // sizing
          'h-11 w-20 rounded-md after:rounded-md',
          'after:left-[4px] after:top-[4px] after:h-9 after:w-9 after:border-0 after:shadow-slate-900',
          // default
          'bg-slate-300 transition-colors duration-500 hover:bg-slate-400',
          // dark defaults
          'dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600',
          // checked
          'peer peer-checked:bg-club-600 peer-checked:after:translate-x-full peer-checked:hover:bg-club-500',
          // focus
          // 'peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-club-300 dark:peer-focus:ring-club-800',
          // circle
          'after:absolute after:bg-white after:transition-all',
          'hover:after:-translate-x-0.5 hover:after:-translate-y-0.5 hover:after:shadow-hard-xs',
        )}
      ></div>
      <Label className="ml-3">{label}</Label>
    </label>
  );
}

export const InputToggle = forwardRef(InputToggleUI);
