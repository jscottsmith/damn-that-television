import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { TransitionGroup } from 'react-transition-group';
import '../sass/root.scss';
import '../sass/globals.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bwo5nqc.css"
        ></link>
        <link
          rel="canonical"
          href={`https://damnthat.tv${router.pathname}`}
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
      </Head>
      <TransitionGroup>
        <Component {...pageProps} />
      </TransitionGroup>
    </>
  );
}
export default MyApp;
