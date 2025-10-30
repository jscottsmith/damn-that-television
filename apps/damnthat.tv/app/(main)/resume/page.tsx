import React from 'react';
import { Resume } from 'app/(main)/resume/Resume';
import { createClient } from 'prismicio';
import { Metadata } from 'next';
import { METADATA } from '@/constants/app';
import type { ResumeDocument } from '../../../prismicio-types';

export const metadata: Metadata = {
  title: `Résumé | J Scott Smith | ${METADATA.title}`,
  description:
    'Résumé of J Scott Smith, engineering leader and creative developer.',
};

async function Page() {
  const client = createClient();
  const document = await client.getSingle<ResumeDocument>('resume', {});
  return <Resume document={document} />;
}

export default Page;
