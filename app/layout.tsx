import type { Metadata } from 'next';

import '/sass/root.scss';
import '/sass/globals.scss';

export const metadata: Metadata = {
  title: 'Design System',
  metadataBase: new URL('https://damnthat.tv'),
  description: 'Damnthat.tv | Design System',
  viewport:
    'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
  manifest: 'https://nextjs.org/manifest.json',
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

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
