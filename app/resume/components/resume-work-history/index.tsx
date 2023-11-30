import { Badge } from '@/components/badge';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { formatterMonthYear } from 'app/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import { TitleAndSubtitle } from '../TitleAndSubtitle';

export const RECENT_WORK_HISTORY_ID = 'recent-work-history';

export const ResumeWorkHistory = (props) => {
  return (
    <div id={RECENT_WORK_HISTORY_ID}>
      <SectionTitle text={props.primary.title} />

      {props.items.map((item, i) => (
        <section className="mb-xl relative pl-md md:pl-lg" key={i}>
          <span className="border-dotted border-slate-200 dark:border-slate-700 border-l-2 absolute top-md bottom-sm left-0">
            <span className="border-dotted border-slate-200 dark:border-slate-700 border-t-2 absolute top-0 left-0 w-2 md:w-3" />
            <span className="border-dotted border-slate-200 dark:border-slate-700 border-t-2 absolute bottom-0 left-0 w-2 md:w-3" />
          </span>
          <TitleAndSubtitle
            className="text-2xl"
            title={item.company}
            subtitle={item.job_title}
          />
          <Prose className="mt-base mb-lg md:mt-lg md:mb-xl">
            <RichText render={item.content} />
          </Prose>
          <footer className="mt-md">
            {item.keywords && (
              <ul>
                {item.keywords.split(', ').map((keyword) => (
                  <li key={keyword} className="inline-block mr-sm mb-sm">
                    <Badge>{keyword}</Badge>
                  </li>
                ))}
              </ul>
            )}
            <DateRange
              dateFormatter={formatterMonthYear}
              startDate={item.start_date}
              endDate={item.end_date}
              presentRole={item.present_role}
            />
          </footer>
        </section>
      ))}
    </div>
  );
};
