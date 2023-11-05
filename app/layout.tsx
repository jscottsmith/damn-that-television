import type { Metadata, Viewport } from 'next';

import '/sass/root.scss';
import '/sass/globals.scss';

export const metadata: Metadata = {
  title: 'Design System',
  metadataBase: new URL('https://damnthat.tv'),
  description: 'Damnthat.tv | Design System',
  manifest: 'https://nextjs.org/manifest.json',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
