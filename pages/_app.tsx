import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { TransitionGroup } from 'react-transition-group';
import { PageLoader } from '../components/page-loader';
import '../sass/root.scss';
import '../sass/globals.scss';

function MyApp({ Component, pageProps }) {
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
