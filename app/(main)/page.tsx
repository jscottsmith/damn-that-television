import React from 'react';
import { createClient } from 'lib/prismicio';
import { Home } from 'app/(main)/home';
import type { Content } from '@prismicio/client';

export default async function Page() {
  const client = createClient();
  const document = await client.getSingle<Content.HomepageDocument>(
    'homepage',
    {},
  );
  return <Home document={document} />;
}
