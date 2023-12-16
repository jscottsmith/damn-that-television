import { RichText } from 'prismic-reactjs';
import React from 'react';
import { formatterYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { TitleAndSubtitle } from '../TitleAndSubtitle';

export const ResumeWorkHistoryCondensed = (props) => {
  return (
    <div>
      <SectionTitle text={props.primary.title} />

      {props.items.map((item, i) => (
        <section className="mb-xl text-slate-700" key={i}>
          <TitleAndSubtitle
            className="text-xl"
            title={item.company}
            subtitle={item.job_title}
          />
          <DateRange
            dateFormatter={formatterYear}
            startDate={item.start_date}
            endDate={item.end_date}
          />
        </section>
      ))}
    </div>
  );
};
