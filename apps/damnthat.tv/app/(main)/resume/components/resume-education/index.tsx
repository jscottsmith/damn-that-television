import { formatterYear } from 'app/(main)/resume/helpers/format-date';
import type { ResumeSchool } from 'lib/content/types';
import { DateRange } from '../date-range';
import { SectionTitle } from '../SectionTitle';
import { TitleAndSubtitle } from '../TitleAndSubtitle';

export const ResumeEducation = (props: {
  title?: string;
  schools: ResumeSchool[];
}) => {
  return (
    <div>
      <SectionTitle text={props.title} />

      {props.schools.map((school) => (
        <section className="mb-8" key={school.institution}>
          <TitleAndSubtitle
            className="text-xl"
            title={school.institution}
            subtitle={school.copy}
          />
          <DateRange
            dateFormatter={formatterYear}
            startDate={school.start}
            endDate={school.end}
          />
        </section>
      ))}
    </div>
  );
};
