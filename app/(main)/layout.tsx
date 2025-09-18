import { Footer } from '@/components/page-globals/footer';
import { HeaderNav } from '@/components/page-globals/header-nav';
import { METADATA } from '@/constants/app';
import React, { PropsWithChildren } from 'react';
import HashRoute from './HashRoute';

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
      <HashRoute />
      <HeaderNav />
      {props.children}
      <Footer />
    </>
  );
}
