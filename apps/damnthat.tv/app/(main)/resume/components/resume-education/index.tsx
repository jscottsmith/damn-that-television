import type { ReactNode } from 'react';
import { formatterYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { SectionTitle } from '../SectionTitle';
import { TitleAndSubtitle } from '../TitleAndSubtitle';
import { elementsOfType } from '../children';

export type SchoolProps = {
  institution: string;
  copy?: string;
  start?: string;
  end?: string;
};

export function School(_props: SchoolProps) {
  return null;
}

export const ResumeEducation = (props: {
  title?: string;
  children?: ReactNode;
}) => {
  const schools = elementsOfType<SchoolProps>(props.children, School);

  return (
    <div>
      <SectionTitle text={props.title} />

      {schools.map((school, index) => (
        <section className="mb-8" key={index}>
          <TitleAndSubtitle
            className="text-xl"
            title={school.props.institution}
            subtitle={school.props.copy}
          />
          <DateRange
            dateFormatter={formatterYear}
            startDate={school.props.start}
            endDate={school.props.end}
          />
        </section>
      ))}
    </div>
  );
};
