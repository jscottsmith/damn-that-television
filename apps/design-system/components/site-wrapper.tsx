import clsx from 'clsx';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from '@/helpers/tailwind-merge';

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
      className={twMerge(
        clsx(
          'px-3 md:px-6 lg:px-8 xl:px-12 2xl:px-24',
          padY && 'py-3 md:py-6 lg:py-8 xl:py-12 2xl:py-24',
          padT && 'pt-3 md:pt-6 lg:pt-8 xl:pt-12 2xl:pt-24',
          padB && 'pb-3 md:pb-6 lg:pb-8 xl:pb-12 2xl:pb-24',
        ),
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
