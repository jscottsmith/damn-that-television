import React, { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
type SelectionButton = ButtonHTMLAttributes<{}> & { isSelected: boolean };

export const SelectionButton = (props: SelectionButton) => {
  const { className, isSelected, ...rest } = props;
  return (
    <button
      className={cx(
        'py-sm px-md rounded-md',
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
