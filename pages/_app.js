import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import '../sass/root.scss';
import './resume/Resume.scss';
export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <TransitionGroup>
          <Component {...pageProps} />
        </TransitionGroup>
        <Script src="https://use.typekit.net/bwo5nqc.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: 'try{Typekit.load({ async: true });}catch(e){}',
          }}
        />
      </>
    );
  }
}
