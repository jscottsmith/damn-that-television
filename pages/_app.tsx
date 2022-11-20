import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { TransitionGroup } from 'react-transition-group';
import { PageLoader } from '../components/page-loader';
import '../sass/root.scss';
import '../sass/globals.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, [Router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="canonical"
          href={`https://damnthat.tv${router.pathname}`}
        ></link>
      </Head>
      {!loading ? (
        <TransitionGroup>
          <Component {...pageProps} />
        </TransitionGroup>
      ) : (
        <PageLoader />
      )}
    </>
  );
}

export default MyApp;
