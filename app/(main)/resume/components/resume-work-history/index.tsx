import { Badge } from '@/components/badge';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';
import React, { useMemo } from 'react';
import { formatterMonthYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import Image from 'next/image';
import type {
  ResumeDocumentDataBodyResumeWorkHistorySlice,
  ResumeDocumentDataBodyResumeWorkHistorySliceItem,
} from 'types/prismic-generated';
import clsx from 'clsx';

export const RECENT_WORK_HISTORY_ID = 'recent-work-history';

interface WorkGroup {
  company: ResumeDocumentDataBodyResumeWorkHistorySliceItem['company'];
  company_logo: ResumeDocumentDataBodyResumeWorkHistorySliceItem['company_logo'];
  jobs: ResumeDocumentDataBodyResumeWorkHistorySliceItem[];
}

export const ResumeWorkHistory = (
  props: ResumeDocumentDataBodyResumeWorkHistorySlice,
) => {
  // Group items by company when they appear sequentially
  const groupedItems = useMemo(() => {
    return props.items.reduce<WorkGroup[]>((groups, item, i) => {
      const currentCompanyText = asText(item.company);
      const previousCompanyText =
        i > 0 ? asText(props.items[i - 1].company) : '';
      const isNewCompany =
        i === 0 || currentCompanyText !== previousCompanyText;

      if (isNewCompany) {
        // Start a new group
        groups.push({
          company: item.company,
          company_logo: item.company_logo,
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
        <section className="relative mb-3xl" key={groupIndex}>
          {/* Company name - shown only once per group */}
          <header className="mb-base flex items-center gap-2 md:gap-4">
            {group.company_logo?.url && (
              <Image
                className="h-14 w-14 rounded-md"
                src={group.company_logo.url}
                width={group.company_logo.dimensions.width}
                height={group.company_logo.dimensions.height}
                alt={group.company_logo.alt || ''}
              />
            )}
            <div className="text-2xl font-semibold md:text-3xl">
              <PrismicRichText field={group.company} />
            </div>
          </header>

          {/* Jobs under this company */}
          <div className="relative ml-2 pl-md md:pl-lg">
            {/* bottom must match the date range line */}
            <span className="absolute bottom-2 left-0 top-3 border-l-2 border-dotted border-slate-300 dark:border-slate-600">
              <span className="absolute right-0 top-0 block h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            </span>

            {group.jobs.map((item, jobIndex) => (
              <div key={jobIndex} className={clsx(jobIndex > 0 && 'mt-lg')}>
                <div className="mb-base text-xl font-medium text-slate-600 dark:text-slate-300">
                  <PrismicRichText field={item.job_title} />
                </div>

                <Prose className="mb-lg mt-base md:mb-xl md:mt-lg">
                  <PrismicRichText field={item.content} />
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
                    <span className="absolute left-0 w-2 border-t-2 border-dotted border-slate-300 dark:border-slate-600 md:w-3">
                      <span className="absolute right-0 top-1/2 block h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    </span>
                    <DateRange
                      dateFormatter={formatterMonthYear}
                      startDate={item.start_date}
                      endDate={item.end_date || null}
                      presentRole={item.present_role}
                    />
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
