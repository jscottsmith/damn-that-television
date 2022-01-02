/* eslint-disable react/no-danger */

import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script async src="https://use.typekit.net/bwo5nqc.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: 'try{Typekit.load({ async: true });}catch(e){}',
          }}
        />
      </Html>
    );
  }
}
