import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { TransitionGroup } from 'react-transition-group';
import { PageLoader } from '../components/page-loader';
import '../sass/root.scss';
import '../sass/globals.scss';

const getGtag = () =>
  `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-DGR8W8P5K3');`;

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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DGR8W8P5K3"
        />
        <script dangerouslySetInnerHTML={{ __html: getGtag() }} />
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
