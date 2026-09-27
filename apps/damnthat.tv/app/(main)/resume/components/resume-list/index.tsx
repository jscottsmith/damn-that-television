import type { ReactNode } from 'react';
import { Prose } from '@workspace/ui/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { Badge } from '@workspace/ui/components/badge';
import { contentBeside, elementsOfType } from '../children';

export type ResumeListItemProps = {
  children?: ReactNode;
};

export function Item({ children }: ResumeListItemProps) {
  return children;
}

export const ResumeList = (props: { title?: string; children?: ReactNode }) => {
  const items = elementsOfType<ResumeListItemProps>(props.children, Item);
  const intro = contentBeside<ResumeListItemProps>(props.children, Item);

  return (
    <section>
      <SectionTitle text={props.title} />
      {intro.length > 0 && <Prose className="mb-3">{intro}</Prose>}
      <ul className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={index}>
            <Badge size="lg">{item.props.children}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
