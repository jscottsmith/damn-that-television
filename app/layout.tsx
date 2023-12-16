import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';

import '/sass/root.scss';
import '/sass/globals.scss';
import { HeaderNav } from '@/components/header-nav';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Design System',
  metadataBase: new URL('https://damnthat.tv'),
  description: 'Damnthat.tv | Design System',
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: If you do not add suppressHydrationWarning to your <html> you
  // will get warnings because next-themes updates that element. This property
  // only applies one level deep, so it won't block hydration warnings on other elements.
  // @see https://github.com/pacocoursey/next-themes#with-app
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bwo5nqc.css" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* TODO: pathname */}
        {/* <link rel="canonical" href={`https://damnthat.tv${router.pathname}`} /> */}

        {/* Google Tag */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DGR8W8P5K3" />
        <Script id="google-analytics">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-DGR8W8P5K3');`}</Script>
      </head>
      <body>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
