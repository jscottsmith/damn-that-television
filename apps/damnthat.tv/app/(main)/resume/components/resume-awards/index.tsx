import { Badge } from '@workspace/ui/components/badge';
import type { ResumeAward } from 'lib/content/types';
import { SectionTitle } from '../SectionTitle';

export const ResumeAwards = (props: {
  title?: string;
  awards: ResumeAward[];
}) => {
  return (
    <section>
      <SectionTitle text={props.title} />

      <ul>
        {props.awards.map((award) => (
          <li key={award.title} className="mb-4">
            <div className="font-futura mb-1 text-xl font-normal italic">
              {award.title}
            </div>
            <Badge variant="primary">{award.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
