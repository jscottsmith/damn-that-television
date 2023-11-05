import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
type SelectionButton = ButtonHTMLAttributes<{}> & { isSelected: boolean };

export const SelectionButton = (props: SelectionButton) => {
  const { className, isSelected, ...rest } = props;
  return (
    <button
      className={clsx(
        'rounded-md py-sm px-md',
        isSelected
          ? 'bg-miami hover:bg-miami-old'
          : 'bg-transparent hover:bg-gray-100',
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
