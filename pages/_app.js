import App from 'next/app';
import Head from 'next/head';
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
      </>
    );
  }
}
