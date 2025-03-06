import { HeaderNav } from '@/components/header-nav';
import { METADATA } from '@/constants/app';
import React, { PropsWithChildren } from 'react';

export async function generateMetadata({ params }) {
  const currentPath = params?.slug ? `/${params.slug}` : '';
  return {
    title: METADATA.title,
    description: METADATA.description,
    openGraph: {
      url: `${METADATA.baseUrl}/${currentPath}`,
      siteName: METADATA.title,
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
