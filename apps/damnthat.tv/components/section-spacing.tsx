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
        marginY && 'my-xl lg:my-2xl xl:my-3xl 2xl:my-4xl',
        marginT && 'mt-xl lg:mt-2xl xl:mt-3xl 2xl:mt-4xl',
        marginB && 'mb-xl lg:mb-2xl xl:mb-3xl 2xl:mb-4xl',
      )}
      {...props}
    >
      {props.children}
    </SlotComponent>
  );
}
