import type { ReactNode } from 'react';
import { formatterYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { SectionTitle } from '../SectionTitle';
import { TitleAndSubtitle } from '../TitleAndSubtitle';
import { elementsOfType } from '../children';

export type CondensedJobProps = {
  company: string;
  role: string;
  start?: string;
  end?: string;
};

export function CondensedJob(_props: CondensedJobProps) {
  return null;
}

export const ResumeWorkHistoryCondensed = (props: {
  title?: string;
  children?: ReactNode;
}) => {
  const jobs = elementsOfType<CondensedJobProps>(props.children, CondensedJob);

  return (
    <div>
      <SectionTitle text={props.title} />

      {jobs.map((job, index) => (
        <section className="text-foreground mb-8" key={index}>
          <TitleAndSubtitle
            className="text-xl"
            title={job.props.company}
            subtitle={job.props.role}
          />
          <DateRange
            dateFormatter={formatterYear}
            startDate={job.props.start}
            endDate={job.props.end}
          />
        </section>
      ))}
    </div>
  );
};
