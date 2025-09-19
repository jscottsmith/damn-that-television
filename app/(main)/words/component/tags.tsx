import { Badge } from '@/components/badge';
import { PrismicDocument } from '@prismicio/client';
import React from 'react';

export default function Tags(props: { tags: PrismicDocument['tags'] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {props.tags.map((tag) => (
        <li key={tag}>
          <Badge>{tag}</Badge>
        </li>
      ))}
    </ul>
  );
}
