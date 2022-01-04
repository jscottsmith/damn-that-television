import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import '../sass/root.scss';
import '../sass/globals.scss';
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
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
        </Head>
        <TransitionGroup>
          <Component {...pageProps} />
        </TransitionGroup>
      </>
    );
  }
}
