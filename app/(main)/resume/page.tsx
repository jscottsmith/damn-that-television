import React from 'react';
import { Resume } from 'app/(main)/resume/Resume';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';
import { Metadata } from 'next';
import { METADATA } from '@/constants/app';

export const metadata: Metadata = {
  title: `Résumé | ${METADATA.title}`,
  description:
    'Résumé of J Scott Smith, engineering leader and creative developer.',
};

async function Page() {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('resume', {});
  return <Resume document={document} />;
}

export default Page;
