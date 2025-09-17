import React from 'react';
import { formatterYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { TitleAndSubtitle } from '../TitleAndSubtitle';
import type { ResumeEducationSlice } from '../../../../../prismicio-types';

export const ResumeEducation = (props: ResumeEducationSlice) => {
  return (
    <div>
      <SectionTitle text={props.primary.title} />

      {props.items.map((item, i) => {
        return (
          <section className="mb-xl" key={i}>
            <TitleAndSubtitle
              className="text-xl"
              title={item.institution}
              subtitle={item.copy}
            />
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
