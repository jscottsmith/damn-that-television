import React from 'react';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';
import { Home } from 'app/(main)/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Damn that television!',
  description: `What a bad picture! Don't get upset, it's not a major disaster.`,
};

export default async function Page() {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('homepage', {});
  return <Home document={document} />;
}
