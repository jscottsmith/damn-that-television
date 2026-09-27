import { createSlug } from '@/helpers/create-slug';
import { AnchorLinkCopy } from '@/components/anchor-link-copy';

export function SectionTitle(props: { text?: string }) {
  if (!props.text) {
    return null;
  }

  const slug = createSlug(props.text);
  return (
    <AnchorLinkCopy id={slug} className="mt-12 mb-6 pb-2">
      <div
        id={slug}
        className="border-peach font-futura text-miami-old dark:border-club-700 border-b-2 text-4xl font-normal italic"
      >
        {props.text}
      </div>
    </AnchorLinkCopy>
  );
}
