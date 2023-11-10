import clsx from 'clsx';
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Label } from '../typography/label';

type InputToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function InputToggleUI({ label, ...props }: InputToggleProps, ref) {
  return (
    <label className="relative inline-flex items-center cursor-pointer overflow-hidden">
      <input type="checkbox" className="sr-only peer" ref={ref} {...props} />
      <div
        className={clsx(
          // sizing
          'w-20 h-11 rounded-md after:rounded-md',
          'after:h-9 after:w-9 after:top-[4px] after:left-[4px] after:border-0 after:shadow-slate-900',
          // default
          'bg-slate-300 hover:bg-slate-400 transition-colors duration-500',
          // dark defaults
          'dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-600',
          // checked
          'peer peer-checked:bg-club-600 peer-checked:after:translate-x-full peer-checked:hover:bg-club-500',
          // focus
          // 'peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-club-300 dark:peer-focus:ring-club-800',
          // circle
          'after:absolute after:bg-white after:transition-all',
          'hover:after:-translate-y-0.5 hover:after:-translate-x-0.5 hover:after:shadow-hard-xs',
        )}
      ></div>
      <Label className="ml-3">{label}</Label>
    </label>
  );
}

export const InputToggle = forwardRef(InputToggleUI);
