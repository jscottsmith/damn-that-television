import clsx from 'clsx';
import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function InputToggleUI(props: InputToggleProps, ref) {
  return (
    <label className="relative inline-flex items-center cursor-pointer overflow-hidden">
      <input type="checkbox" className="sr-only peer" ref={ref} {...props} />
      <div
        className={clsx(
          // sizing
          'w-[76px] h-10 rounded-md after:rounded-md',
          'after:h-9 after:w-9 after:top-[4px] after:left-[4px] after:border-0',
          // default
          'bg-slate-300 transition-colors duration-500',
          // dark defaults
          'dark:bg-slate-700 dark:border-slate-600',
          // checked
          'peer peer-checked:bg-club-600 peer-checked:after:translate-x-full',
          // focus
          // 'peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-club-300 dark:peer-focus:ring-club-800',
          // circle
          'after:absolute after:bg-white after:border after:transition-all after:border-r-4 after:border-b-4 after:border-deep',
        )}
      ></div>
      <span className="ml-3 uppercase font-bold text-sm text-deep dark:text-ghost">
        {props.label}
      </span>
    </label>
  );
}

export const InputToggle = forwardRef(InputToggleUI);
