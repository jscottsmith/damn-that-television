import { Badge } from '@/components/badge';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React, { useMemo } from 'react';
import { formatterMonthYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';

export const RECENT_WORK_HISTORY_ID = 'recent-work-history';

interface WorkItem {
  company: RichTextBlock[];
  job_title: RichTextBlock[];
  content: RichTextBlock[];
  keywords?: string;
  start_date: string;
  end_date: string;
  present_role: boolean;
}

interface WorkGroup {
  company: RichTextBlock[];
  jobs: WorkItem[];
}

export const ResumeWorkHistory = (props: {
  primary: { title: RichTextBlock[] };
  items: WorkItem[];
}) => {
  // Group items by company when they appear sequentially
  const groupedItems = useMemo(() => {
    return props.items.reduce<WorkGroup[]>((groups, item, i) => {
      const isNewCompany =
        i === 0 ||
        item.company[0]?.text !== props.items[i - 1].company[0]?.text;

      if (isNewCompany) {
        // Start a new group
        groups.push({
          company: item.company,
          jobs: [item],
        });
      } else {
        // Add to existing group
        const lastGroup = groups[groups.length - 1];
        lastGroup.jobs.push(item);
      }

      return groups;
    }, []);
  }, [props.items]);

  return (
    <div id={RECENT_WORK_HISTORY_ID}>
      <SectionTitle text={props.primary.title} />

      {groupedItems.map((group, groupIndex) => (
        <section className="relative mb-3xl pl-md md:pl-lg" key={groupIndex}>
          {/* bottom must match the date range line */}
          <span className="absolute bottom-2 left-0 top-md border-l-2 border-dotted border-slate-200 dark:border-slate-700">
            <span className="absolute left-0 top-0 w-2 border-t-2 border-dotted border-slate-200 dark:border-slate-700 md:w-3" />
          </span>

          {/* Company name - shown only once per group */}
          <div className="mb-base text-2xl font-semibold">
            <RichText render={group.company} />
          </div>

          {/* Jobs under this company */}
          {group.jobs.map((item, jobIndex) => (
            <div key={jobIndex} className={jobIndex > 0 ? 'mt-lg' : ''}>
              <div className="mb-base text-xl font-medium text-slate-700 dark:text-slate-200">
                <RichText render={item.job_title} />
              </div>
              <Prose className="mb-lg mt-base md:mb-xl md:mt-lg">
                <RichText render={item.content} />
              </Prose>
              <footer className="mt-md">
                {item.keywords && (
                  <ul>
                    {item.keywords.split(', ').map((keyword) => (
                      <li key={keyword} className="mb-sm mr-sm inline-block">
                        <Badge>{keyword}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="my-4 flex h-0 items-center pb-2">
                  <span className="absolute left-0 w-2 border-t-2 border-dotted border-slate-200 dark:border-slate-700 md:w-3" />
                  <DateRange
                    dateFormatter={formatterMonthYear}
                    startDate={item.start_date}
                    endDate={item.end_date}
                    presentRole={item.present_role}
                  />
                </div>
              </footer>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
