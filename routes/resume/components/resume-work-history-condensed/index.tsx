import { RichText } from 'prismic-reactjs';
import React from 'react';
import { formatterYear } from 'routes/resume/helpers/format-date';
import { DateRange } from '../date-range';

export const ResumeWorkHistoryCondensed = (props) => {
  return (
    <div>
      <span className="prose">
        <RichText render={props.primary.title} />
      </span>

      {props.items.map((item, i) => (
        <section className="mb-xl" key={i}>
          <div>
            <span className="inline-block font-medium text-xl">
              <RichText render={item.company} />
            </span>
            <span className="h-4 mx-md border-peach border-solid border-r-2 inline-block" />
            <span className="text-xl font-light inline-block italic">
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
