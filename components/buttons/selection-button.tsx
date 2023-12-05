import clsx from 'clsx';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, type ButtonProps } from './button';

export type SelectionButtonProps = ButtonProps & {
  isSelected: boolean;
};

export const SelectionButton = (props: SelectionButtonProps) => {
  const { className, isSelected, icon, ...rest } = props;
  return (
    <Button
      icon={isSelected ? <CheckIcon /> : icon ?? <XMarkIcon />}
      iconContainerClassName={isSelected ? 'bg-club-700' : undefined}
      className={clsx(
        className,
        { selected: isSelected },
        '[&.selected]:bg-club [&.selected]:hover:bg-club-600 [&.selected]:text-white [&.selected]:shadow-hard-sm [&.selected]:-translate-x-1 [&.selected]:-translate-y-1',
      )}
      {...rest}
    >
      {props.children}
    </Button>
  );
};
