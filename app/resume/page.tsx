import React from 'react';
import { Resume } from 'app/resume';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';

async function Page() {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('resume', {});
  return <Resume document={document} />;
}

export default Page;
