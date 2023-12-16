import clsx from 'clsx';

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function BaseInput({ className, ...rest }: BaseInputProps) {
  return (
    <input
      {...rest}
      className={clsx(
        'w-full block',
        'py-base px-md',
        'rounded-lg',
        // bg
        'bg-slate-200 dark:bg-slate-900',
        // text
        'text-lg text-slate-900 dark:text-slate-200',
        // disabled
        'disabled:text-slate-400 dark:disabled:text-slate-600 disabled:pointer-events-none',
        // placeholder
        'placeholder:text-slate-400 dark:placeholder:text-slate-600',

        'focus:outline-club focus:bg-slate-100 focus:dark:bg-slate-950',

        // shadow color
        // 'shadow-slate-700 dark:shadow-slate-950',
        // 'valid:-translate-y-0.5 valid:-translate-x-0.5 valid:shadow-hard-xs',
        // focus
        // 'focus:outline-none focus:shadow-hard-xs focus:-translate-x-0.5 focus:-translate-y-0.5',
        // transition
        // 'transition-[box-shadow,color,transform] duration-200',
      )}
    />
  );
}
