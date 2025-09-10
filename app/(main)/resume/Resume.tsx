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
import { SurfaceBackground } from '@/components/surface';
import { SiteWrapper } from '@/components/site-wrapper';
import type { ResumeDocument } from 'types/prismic-generated';

interface ResumeProps {
  document: ResumeDocument;
}

export const Resume = (props: ResumeProps) => {
  return (
    <SurfaceBackground asChild>
      <SiteWrapper padY>
        <article className="pt-4xl">
          <CardPrimary className="mx-auto max-w-screen-lg p-sm md:flex md:gap-md md:p-md lg:gap-lg lg:p-lg xl:p-xl 2xl:p-2xl">
            <ResumeHeader
              document={props.document}
              className="-mt-3xl md:sticky md:top-xl md:mt-0 md:w-1/3 md:self-start"
            />
            <div className="md:w-2/3">
              {props.document.data.body.map((slice, i) => {
                if (slice.slice_type === 'resume_work_history') {
                  return <ResumeWorkHistory {...slice} key={i} />;
                }
                if (slice.slice_type === 'resume_education') {
                  return <ResumeEducation {...slice} key={i} />;
                }
                if (slice.slice_type === 'resume_work_history_condensed') {
                  return <ResumeWorkHistoryCondensed {...slice} key={i} />;
                }
                if (slice.slice_type === 'work_together') {
                  return <WorkTogether {...slice} key={i} />;
                }
                if (slice.slice_type === 'resume_content') {
                  return <ResumeContent {...slice} key={i} />;
                }
                if (slice.slice_type === 'resume_list') {
                  return <ResumeList {...slice} key={i} />;
                }
                if (slice.slice_type === 'resume_awards') {
                  return <ResumeAwards {...slice} key={i} />;
                }

                return null;
              })}
            </div>
          </CardPrimary>
        </article>
      </SiteWrapper>
    </SurfaceBackground>
  );
};
