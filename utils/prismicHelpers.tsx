// ~/utils/prismicHelpers.js
import Link from 'next/link';
import { linkResolver } from '../prismicConfiguration';

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (type, element, content, children, index) => (
  <Link key={index} href={linkResolver(element.data)}>
    {content}
  </Link>
);
