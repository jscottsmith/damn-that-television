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
        marginY && 'my-base md:my-lg lg:my-xl xl:my-2xl 2xl:my-4xl',
        marginT && 'mt-base md:mt-lg lg:mt-xl xl:mt-2xl 2xl:mt-4xl',
        marginB && 'mb-base md:mb-lg lg:mb-xl xl:mb-2xl 2xl:mb-4xl',
      )}
      {...props}
    >
      {props.children}
    </SlotComponent>
  );
}
