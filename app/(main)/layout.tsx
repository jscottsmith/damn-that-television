import { HeaderNav } from '@/components/header-nav';
import React, { PropsWithChildren } from 'react';

export async function generateMetadata({ params }) {
  const currentPath = params?.slug ? `/${params.slug}` : '';
  return {
    openGraph: {
      url: `https://damnthat.tv/${currentPath}`,
    },
  };
}

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
