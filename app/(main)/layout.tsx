import { HeaderNav } from '@/components/header-nav';
import React, { PropsWithChildren } from 'react';

/**
 *
 * The Main group layout isolates the header to only the pages that require it.
 */

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <HeaderNav />
      {props.children}
    </>
  );
}
