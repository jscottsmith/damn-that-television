import clsx from 'clsx';
import { SlotComponent, SlotComponentProps } from './slot';

export function SurfaceInteractive({
  className,
  ...props
}: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(
        className,
        'inline-flex items-center rounded-full',
        'bg-secondary text-secondary-foreground hocus:bg-accent hocus:text-accent-foreground shadow-secondary',
        // hover
        'hover:shadow-hard-xs hover:-translate-x-0.5 hover:-translate-y-0.5',
        // focus
        'focus:shadow-hard-xs focus:-translate-x-0.5 focus:-translate-y-0.5 focus:outline-none',
        // active
        'active:duration-100 hover:active:translate-x-0 hover:active:translate-y-0 hover:active:shadow-none',
        // transition
        'transition-all duration-200',
      )}
      {...props}
    />
  );
}

export function SurfaceInteractiveSimple(props: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(
        props.className,
        'rounded-md',
        'transition-colors duration-200',
        'hover:bg-muted',
      )}
      {...props}
    />
  );
}

export function SurfaceInteractiveGlass(props: SlotComponentProps) {
  return (
    <SlotComponent
      className={clsx(
        props.className,
        'backdrop-blur-lg',
        'bg-card/20 text-card-foreground',
        'transition-all duration-200 hover:bg-card/60',
      )}
      {...props}
    />
  );
}
