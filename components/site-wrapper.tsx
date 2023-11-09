import clsx from 'clsx';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

type SiteWrapperProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  /**
   * add default site padding to top/bottom
   */
  padY?: boolean;
  padT?: boolean;
  padB?: boolean;
};

export function SiteWrapper({
  padY,
  padT,
  padB,
  className,
  ...props
}: SiteWrapperProps) {
  return (
    <div
      className={clsx(
        className,
        'px-base md:px-lg lg:px-xl xl:px-2xl 2xl:px-4xl',
        padY && 'py-base md:py-lg lg:py-xl xl:py-2xl 2xl:py-4xl',
        padT && 'pt-base md:pt-lg lg:pt-xl xl:pt-2xl 2xl:pt-4xl',
        padB && 'pb-base md:pb-lg lg:pb-xl xl:pb-2xl 2xl:pb-4xl',
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
