import { RichText } from 'prismic-reactjs';
import React from 'react';
import { formatterYear } from 'app/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';

export const ResumeWorkHistoryCondensed = (props) => {
  return (
    <div>
      <SectionTitle text={props.primary.title} />

      {props.items.map((item, i) => (
        <section className="mb-xl text-slate-700" key={i}>
          <div>
            <span className="inline-block font-medium font-futura text-xl">
              <RichText render={item.company} />
            </span>
            <span className="h-4 mx-md border-peach border-solid border-r-2 inline-block" />
            <span className="text-xl font-light font-futura inline-block italic">
              <RichText render={item.job_title} />
            </span>
          </div>
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
