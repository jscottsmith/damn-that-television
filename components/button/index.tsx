import React from 'react';
import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';

export enum ButtonTypes {
  'pepto' = 'pepto',
  'blue' = 'blue',
  'gray' = 'gray',
  'deep' = 'deep',
}

export enum ButtonSizes {
  'sm' = 'sm',
  'md' = 'md',
  'default' = 'default',
  'lg' = 'lg',
}

export function getButtonSize(buttonSize: keyof typeof ButtonSizes) {
  const styles = {
    [ButtonSizes.sm]:
      'px-3 py-0 md:px-4 md:py-1 rounded text-md hover:scale-105 transition-all',
    [ButtonSizes.default]:
      'px-4 py-1 md:px-6 md:py-2 rounded-md text-xl hover:scale-105 transition-all',
    [ButtonSizes.md]:
      'px-5 py-2 md:px-7 md:py-3 rounded-md text-2xl hover:scale-105 transition-all',
    [ButtonSizes.lg]:
      'px-6 py-3 md:px-9 md:py-6 rounded-lg text-2xl md:text-3xl font-bold hover:scale-105 transition-all',
  };
  return styles[buttonSize];
}

function getButtonStyle(buttonType: keyof typeof ButtonTypes) {
  const styles = {
    [ButtonTypes.deep]:
      'bg-deep text-ghost disabled:bg-gray-700 disabled:text-gray-200 hover:text-club',
    [ButtonTypes.gray]:
      'bg-gray-300 text-gray-900 disabled:bg-gray-700 disabled:text-gray-200 hover:text-gray-50 hover:bg-gray-700',
    [ButtonTypes.blue]:
      'bg-blue-700 text-gray-100 disabled:bg-gray-700 disabled:text-gray-200 hover:text-gray-50 hover:bg-blue-900',
    [ButtonTypes.pepto]:
      'bg-pepto text-deep disabled:bg-gray-700 disabled:text-gray-200 hover:text-white hover:bg-lunar',
  };
  return styles[buttonType];
}

export const Button = (
  props: PropsWithChildren<
    ButtonHTMLAttributes<{}> & {
      buttonType?: keyof typeof ButtonTypes;
      buttonSize?: keyof typeof ButtonSizes;
    }
  >,
) => {
  const {
    children,
    className,
    buttonType = ButtonTypes.gray,
    buttonSize = ButtonSizes.default,
    ...rest
  } = props;
  return (
    <button
      className={cx(
        className,
        getButtonStyle(buttonType),
        getButtonSize(buttonSize),
        'font-light leading-loose whitespace-nowrap',
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
