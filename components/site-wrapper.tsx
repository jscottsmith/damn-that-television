import clsx from 'clsx';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

type SiteWrapperProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  /**
   * add default site padding to top/bottom
   */
  padY?: boolean;
};

export function SiteWrapper({ padY, className, ...props }: SiteWrapperProps) {
  return (
    <div
      className={clsx(
        className,
        'px-base md:px-lg lg:px-xl xl:px-2xl 2xl:px-4xl',
        padY && 'py-base md:py-lg lg:py-xl xl:py-2xl 2xl:py-4xl',
      )}
    >
      {props.children}
    </div>
  );
}
