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
      </Head>
      <TransitionGroup>
        <Component {...pageProps} />
      </TransitionGroup>
    </>
  );
}
export default MyApp;
