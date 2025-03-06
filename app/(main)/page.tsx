import React from 'react';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';
import { Home } from 'app/(main)/home';

export default async function Page() {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('homepage', {});
  return <Home document={document} />;
}
