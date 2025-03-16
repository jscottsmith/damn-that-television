import clsx from 'clsx';

export function Dots(props: { current: number; length: number }) {
  const dots = Array(props.length).fill(0);
  return (
    <div className="flex gap-1">
      {dots.map((_, index) => (
        <span
          key={index}
          className={clsx(
            'inline-block h-1 w-1 rounded-full',
            props.current === index
              ? 'scale-110 bg-club-500 dark:bg-miami'
              : 'bg-slate-200 dark:bg-slate-600',
          )}
        />
      ))}
    </div>
  );
}
