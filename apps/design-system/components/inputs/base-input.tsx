import clsx from 'clsx';

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function BaseInput({ className, ...rest }: BaseInputProps) {
  return (
    <input
      {...rest}
      className={clsx(
        'block w-full',
        'py-3 px-4',
        'rounded-lg',
        // bg
        'bg-secondary',
        // text
        'text-lg text-foreground',
        // disabled
        'disabled:pointer-events-none disabled:text-muted-foreground',
        // placeholder
        'placeholder:text-muted-foreground',

        'focus:outline-club focus:bg-muted',

        // shadow color
        // 'shadow-foreground dark:shadow-background',
        // 'valid:-translate-y-0.5 valid:-translate-x-0.5 valid:shadow-hard-xs',
        // focus
        // 'focus:outline-none focus:shadow-hard-xs focus:-translate-x-0.5 focus:-translate-y-0.5',
        // transition
        // 'transition-[box-shadow,color,transform] duration-200',
      )}
    />
  );
}
