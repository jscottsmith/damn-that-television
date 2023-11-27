import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import { formatterYear } from 'app/resume/helpers/format-date';
import { DateRange } from '../date-range';

type ResumeEducationSliceType = {
  institution: RichTextBlock[];
  copy?: RichTextBlock[];
  start_date: string;
  end_date: string;
};

type ResumeEducationType = {
  primary: {
    title: RichTextBlock[];
  };
  items: ResumeEducationSliceType[];
};

export const ResumeEducation = (props: ResumeEducationType) => {
  return (
    <div>
      <span className="prose">
        <RichText render={props.primary.title} />
      </span>

      {props.items.map((item, i) => {
        const hasCopy = item?.copy?.length ?? 0 > 0;

        return (
          <section className="mb-xl" key={i}>
            <div>
              <span className="inline-block text-xl font-medium">
                <RichText render={item.institution} />
              </span>
              {hasCopy && (
                <span className="mx-md inline-block h-4 border-r-2 border-solid border-peach" />
              )}
              {hasCopy && (
                <span className="prose inline-block">
                  <RichText render={item.copy} />
                </span>
              )}
            </div>
            <DateRange
              dateFormatter={formatterYear}
              startDate={item.start_date}
              endDate={item.end_date}
            />
          </section>
        );
      })}
    </div>
  );
};
