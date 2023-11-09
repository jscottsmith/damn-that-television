import React from 'react';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';

export enum CTAButtonTypes {
  'pepto' = 'pepto',
  'blue' = 'blue',
  'gray' = 'gray',
  'deep' = 'deep',
}

export enum CTAButtonSizes {
  'sm' = 'sm',
  'default' = 'default',
  'md' = 'md',
  'lg' = 'lg',
}

export function getButtonSize(buttonSize: keyof typeof CTAButtonSizes) {
  const styles = {
    [CTAButtonSizes.sm]:
      'px-3 py-0 md:px-4 md:py-1 rounded text-md hover:scale-105 transition-all',
    [CTAButtonSizes.default]:
      'px-4 py-1 md:px-6 md:py-2 rounded-md text-xl hover:scale-105 transition-all',
    [CTAButtonSizes.md]:
      'px-5 py-2 md:px-7 md:py-3 rounded-md text-2xl hover:scale-105 transition-all',
    [CTAButtonSizes.lg]:
      'px-6 py-3 md:px-9 md:py-6 rounded-lg text-2xl md:text-3xl font-bold hover:scale-105 transition-all',
  };
  return styles[buttonSize];
}

function getButtonStyle(buttonType: keyof typeof CTAButtonTypes) {
  const styles = {
    [CTAButtonTypes.deep]:
      'bg-deep text-ghost disabled:bg-gray-700 disabled:text-gray-200 hover:text-club',
    [CTAButtonTypes.gray]:
      'bg-gray-300 text-gray-900 disabled:bg-gray-700 disabled:text-gray-200 hover:text-gray-50 hover:bg-gray-700',
    [CTAButtonTypes.blue]:
      'bg-blue-700 text-gray-100 disabled:bg-gray-700 disabled:text-gray-200 hover:text-gray-50 hover:bg-blue-900',
    [CTAButtonTypes.pepto]:
      'bg-pepto text-deep disabled:bg-gray-700 disabled:text-gray-200 hover:text-white hover:bg-lunar',
  };
  return styles[buttonType];
}

export const CTAButton = (
  props: PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      buttonType?: keyof typeof CTAButtonTypes;
      buttonSize?: keyof typeof CTAButtonSizes;
    }
  >,
) => {
  const {
    children,
    className,
    buttonType = CTAButtonTypes.gray,
    buttonSize = CTAButtonSizes.default,
    ...rest
  } = props;
  return (
    <button
      className={clsx(
        className,
        getButtonStyle(buttonType),
        getButtonSize(buttonSize),
        'whitespace-nowrap font-light leading-loose',
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
