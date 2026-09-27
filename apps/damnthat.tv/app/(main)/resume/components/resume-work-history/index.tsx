import { Badge } from '@workspace/ui/components/badge';
import type { ReactNode } from 'react';
import { formatterMonthYear } from 'app/(main)/resume/helpers/format-date';
import { DateRange } from '../date-range';
import { Prose } from '@workspace/ui/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import Image from 'next/image';
import clsx from 'clsx';
import { AnchorLinkCopy } from '@/components/anchor-link-copy';
import { createSlug } from '@/helpers/create-slug';
import { groupWorkHistory } from './useGroupWorkHistory';
import ExpandContent from '../expand-content';
import { elementsOfType } from '../children';

export const RECENT_WORK_HISTORY_ID = 'recent-work-history';

export type WorkHistoryJobProps = {
  company: string;
  role: string;
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  website?: string;
  start?: string;
  end?: string;
  present?: boolean;
  keywords?: string[];
  children?: ReactNode;
};

export function Job(_props: WorkHistoryJobProps) {
  return null;
}

export const ResumeWorkHistory = (props: {
  title?: string;
  children?: ReactNode;
}) => {
  const jobs = elementsOfType<WorkHistoryJobProps>(props.children, Job).map(
    (job) => ({
      company: job.props.company,
      role: job.props.role,
      logo: job.props.logo,
      logoAlt: job.props.logoAlt,
      logoWidth: job.props.logoWidth,
      logoHeight: job.props.logoHeight,
      website: job.props.website,
      start: job.props.start,
      end: job.props.end,
      present: job.props.present,
      keywords: job.props.keywords,
      description: job.props.children,
    }),
  );
  const groupedItems = groupWorkHistory(jobs);

  return (
    <div id={RECENT_WORK_HISTORY_ID}>
      <SectionTitle text={props.title} />

      {groupedItems.map((group) => {
        const companySlug = createSlug(group.company);
        return (
          <section className="relative mb-16 scroll-mt-20" key={companySlug}>
            <AnchorLinkCopy id={companySlug} className="mb-3">
              <header
                id={companySlug}
                className="flex items-center gap-2 md:gap-4"
                data-website={group.website || undefined}
              >
                {group.logo && (
                  <Image
                    className="h-14 w-14 rounded-md"
                    src={group.logo}
                    width={group.logoWidth ?? 256}
                    height={group.logoHeight ?? 256}
                    alt={group.logoAlt || ''}
                  />
                )}
                <div className="flex items-center">
                  <div className="text-2xl font-semibold md:text-3xl">
                    {group.company}
                  </div>
                </div>
              </header>
            </AnchorLinkCopy>

            <div className="relative ml-2 pl-4 md:pl-6">
              <span className="border-border absolute top-3 bottom-2 left-0 border-l-2 border-dotted">
                <span className="bg-border absolute top-0 right-0 block h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full"></span>
              </span>

              {group.jobs.map((item, jobIndex) => {
                const jobTitleSlug = createSlug(
                  `${companySlug}-${item.role}`,
                );
                return (
                  <div
                    key={jobTitleSlug}
                    className={clsx(jobIndex > 0 && 'mt-6')}
                    id={jobTitleSlug}
                    data-website={item.website || undefined}
                  >
                    <AnchorLinkCopy id={jobTitleSlug} className="mb-3">
                      <div className="text-muted-foreground text-xl font-medium">
                        {item.role}
                      </div>
                    </AnchorLinkCopy>

                    <Prose className="mt-3 mb-6 md:mt-6 md:mb-8">
                      <ExpandContent>{item.description}</ExpandContent>
                    </Prose>

                    <footer className="mt-4">
                      {item.keywords && item.keywords.length > 0 && (
                        <ul>
                          {item.keywords.map((keyword) => (
                            <li
                              key={keyword}
                              className="mr-2 mb-2 inline-block"
                            >
                              <Badge>{keyword}</Badge>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="my-4 flex h-0 items-center pb-2">
                        <span className="border-border absolute left-0 w-2 border-t-2 border-dotted md:w-3">
                          <span className="bg-border absolute top-1/2 right-0 block h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full"></span>
                        </span>
                        <DateRange
                          dateFormatter={formatterMonthYear}
                          startDate={item.start}
                          endDate={item.end || null}
                          presentRole={item.present}
                        />
                      </div>
                    </footer>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
