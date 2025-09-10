import type { PrismicDocument } from "@prismicio/client";

// -- Prismic Repo Name
export const repoName = 'damn-that-television';

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc: PrismicDocument) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }
  if (doc.type === 'resume') {
    return `/${doc.uid}`;
  }
  return '/';
};

const routes = [
  {
    type: 'resume',
    path: '/:uid',
  },
];

export const prismicConfiguration = {
  routes,
};
