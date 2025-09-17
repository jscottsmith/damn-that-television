import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from '../prismicConfiguration';

// Create a Prismic client
export const createClient = (config = {}) => {
  const client = prismic.createClient(repoName, {
    ...prismicConfiguration,
    ...config,
  });

  return client;
};

// Re-export types for convenience
export type { Content } from '@prismicio/client';
export type { AllDocumentTypes } from '../prismicio-types';
