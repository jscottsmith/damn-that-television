'use client';
import React from 'react';
import { ResumeHeader } from './components/resume-header';
import { ResumeContent } from './components/resume-content';
import { ResumeWorkHistory } from './components/resume-work-history';
import { ResumeWorkHistoryCondensed } from './components/resume-work-history-condensed';
import { ResumeList } from './components/resume-list';
import { ResumeAwards } from './components/resume-awards';
import { WorkTogether } from './components/work-together';
import { ResumeEducation } from './components/resume-education';
import { CardPrimary } from '@/components/card';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { SiteWrapper } from '@/components/site-wrapper';
import type { ResumeDocument } from '../../../prismicio-types';

interface ResumeProps {
  document: ResumeDocument;
}

export const Resume = (props: ResumeProps) => {
  return (
    <SiteWrapper
      padY
      className={cn(surfaceVariants({ variant: 'default' }), 'px-0')}
    >
        <article className="pt-24">
          <CardPrimary className="p-3 md:gap-4 md:p-4 lg:gap-6 lg:p-6 xl:p-8 2xl:p-12 mx-auto max-w-screen-lg md:flex">
            <ResumeHeader
              document={props.document}
              className="-mt-16 md:top-8 md:sticky md:mt-0 md:w-1/3 md:self-start"
            />
            <div className="md:w-2/3">
              {props.document.data.body.map((slice, i) => {
                if (slice.slice_type === 'ResumeWorkHistory') {
                  return <ResumeWorkHistory {...slice} key={i} />;
                }
                if (slice.slice_type === 'ResumeEducation') {
                  return <ResumeEducation {...slice} key={i} />;
                }
                if (slice.slice_type === 'ResumeWorkHistoryCondensed') {
                  return <ResumeWorkHistoryCondensed {...slice} key={i} />;
                }
                if (slice.slice_type === 'WorkTogether') {
                  return <WorkTogether {...slice} key={i} />;
                }
                if (slice.slice_type === 'ResumeContent') {
                  return <ResumeContent {...slice} key={i} />;
                }
                if (slice.slice_type === 'ResumeList') {
                  return <ResumeList {...slice} key={i} />;
                }
                if (slice.slice_type === 'ResumeAwards') {
                  return <ResumeAwards {...slice} key={i} />;
                }

                return null;
              })}
            </div>
          </CardPrimary>
        </article>
    </SiteWrapper>
  );
};
