import React from 'react';
import { createClient } from 'lib/prismicio';
import { Home } from 'app/(main)/home';
import type { HomepageDocument } from '../../prismicio-types';

export default async function Page() {
  const client = createClient();
  const document = await client.getSingle<HomepageDocument>('homepage', {});
  return <Home document={document} />;
}
