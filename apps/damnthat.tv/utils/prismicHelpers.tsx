// ~/utils/prismicHelpers.tsx
import Link from 'next/link';
import { linkResolver } from '../prismicio';

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (
  type: string,
  element: any,
  content: React.ReactNode,
  children: React.ReactNode,
  index: number,
) => (
  <Link key={index} href={linkResolver(element.data)}>
    {content}
  </Link>
);
