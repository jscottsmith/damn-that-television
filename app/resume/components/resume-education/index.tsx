import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import { formatterYear } from 'app/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';

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
      <SectionTitle text={props.primary.title} />

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
                <Prose as="span" className="inline-block">
                  <RichText render={item.copy} />
                </Prose>
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
