import type { ReactNode } from 'react';
import { Badge } from '@workspace/ui/components/badge';
import { SectionTitle } from '../SectionTitle';
import { elementsOfType } from '../children';

export type AwardProps = {
  title: string;
  dates?: string;
};

export function Award(_props: AwardProps) {
  return null;
}

export const ResumeAwards = (props: {
  title?: string;
  children?: ReactNode;
}) => {
  const awards = elementsOfType<AwardProps>(props.children, Award);

  return (
    <section>
      <SectionTitle text={props.title} />

      <ul>
        {awards.map((award, index) => (
          <li key={index} className="mb-4">
            <div className="font-futura mb-1 text-xl font-normal italic">
              {award.props.title}
            </div>
            <Badge variant="primary">{award.props.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
