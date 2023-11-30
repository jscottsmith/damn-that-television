import React from 'react';
import { Resume } from 'app/resume/Resume';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of J Scott Smith, a creative web developer.',
  openGraph: {
    url: 'https://damnthat.tv/resume',
    images: [{ url: '/static/avatar.jpg' }],
  },
};

async function Page() {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('resume', {});
  return <Resume document={document} />;
}

export default Page;
