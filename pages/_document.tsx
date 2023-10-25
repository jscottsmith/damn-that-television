import React from 'react';
import { Head, Html, Main, NextScript, DocumentProps } from 'next/document';

const getGtag = () =>
  `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-DGR8W8P5K3');`;

export default function Document(props: DocumentProps) {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bwo5nqc.css"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DGR8W8P5K3"
        />
        <script dangerouslySetInnerHTML={{ __html: getGtag() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
