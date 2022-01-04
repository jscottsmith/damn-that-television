import { RichText } from 'prismic-reactjs';
import React from 'react';
import { formatterMonthYear } from 'routes/resume/helpers/format-date';
import { DateRange } from '../date-range';

export const ResumeWorkHistory = (props) => {
  return (
    <div>
      <span className="prose">
        <RichText render={props.primary.title} />
      </span>

      {props.items.map((item, i) => (
        <section className="mb-xl relative pl-md md:pl-lg" key={i}>
          <span className="border-dotted border-gray-200 border-l-2 absolute top-md bottom-sm left-0">
            <span className="border-dotted border-gray-200 border-t-2 absolute top-0 left-0 w-2 md:w-3" />
            <span className="border-dotted border-gray-200 border-t-2 absolute bottom-0 left-0 w-2 md:w-3" />
          </span>
          <span className="inline-block font-medium text-2xl">
            <RichText render={item.company} />
          </span>
          <span className="h-4 mx-md border-peach border-solid border-r-2 inline-block" />
          <span className="text-2xl font-light inline-block italic">
            <RichText render={item.job_title} />
          </span>
          <div className="prose">
            <RichText render={item.content} />
          </div>
          <DateRange
            dateFormatter={formatterMonthYear}
            startDate={item.start_date}
            endDate={item.end_date}
            presentRole={item.present_role}
          />
        </section>
      ))}
    </div>
  );
};