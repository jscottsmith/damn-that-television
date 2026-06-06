import { Footer } from '@/components/page-globals/footer';
import { HeaderNav } from '@/components/page-globals/header-nav';
import { METADATA } from '@/constants/app';
import React, { PropsWithChildren } from 'react';
import HashRoute from './HashRoute';
import { AfterDark } from './after-dark';

export async function generateMetadata({ params }) {
  const currentPath = params?.slug ? `/${params.slug}` : '';
  const canonicalUrl = currentPath
    ? `${METADATA.baseUrl}${currentPath}`
    : METADATA.baseUrl;
  const defaultSocialImage = '/opengraph-image.jpg';

  return {
    title: METADATA.title,
    description: METADATA.description,
    openGraph: {
      title: METADATA.title,
      description: METADATA.description,
      url: canonicalUrl,
      siteName: METADATA.title,
      images: [
        {
          url: defaultSocialImage,
          alt: 'D A M N',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: METADATA.title,
      description: METADATA.description,
      images: [defaultSocialImage],
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
      <AfterDark />
      <HashRoute />
      <HeaderNav />
      {props.children}
      <Footer />
    </>
  );
}
