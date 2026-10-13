import { Prose } from '@workspace/ui/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { Badge } from '@workspace/ui/components/badge';

export const ResumeList = (props: {
  title?: string;
  intro?: string;
  items: string[];
}) => {
  return (
    <section>
      <SectionTitle text={props.title} />
      {props.intro && (
        <Prose className="mb-3">
          <p>{props.intro}</p>
        </Prose>
      )}
      <ul className="flex flex-wrap gap-2">
        {props.items.map((item) => (
          <li key={item}>
            <Badge size="lg">{item}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
