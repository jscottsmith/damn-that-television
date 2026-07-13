import clsx from 'clsx';
import React from 'react';
import { SlotComponent, SlotComponentProps } from './slot';

type SectionSpacingProps = SlotComponentProps & {
  /**
   * add default margin to top/bottom
   */
  marginY?: boolean;
  marginT?: boolean;
  marginB?: boolean;
};

export function SectionSpacing({
  marginY = true,
  marginT,
  marginB,
  className,
  ...props
}: SectionSpacingProps) {
  return (
    <SlotComponent
      className={clsx(
        className,
        marginY && 'my-8 lg:my-12 xl:my-16 2xl:my-24',
        marginT && 'mt-8 lg:mt-12 xl:mt-16 2xl:mt-24',
        marginB && 'mb-8 lg:mb-12 xl:mb-16 2xl:mb-24',
      )}
      {...props}
    >
      {props.children}
    </SlotComponent>
  );
}
