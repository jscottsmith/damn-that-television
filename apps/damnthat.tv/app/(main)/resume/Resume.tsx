import type { ReactNode } from 'react';
import { ResumeHeader } from './components/resume-header';
import { Card } from '@/components/card';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { SiteWrapper } from '@/components/site-wrapper';
import type { ResumeLinkGroup } from '../../../lib/content/types';

export const Resume = (props: {
  name: string;
  jobTitle: string;
  location: string;
  links: ResumeLinkGroup[];
  children: ReactNode;
}) => {
  return (
    <SiteWrapper
      padY
      className={cn(surfaceVariants({ variant: 'default' }), 'px-0')}
    >
      <article className="pt-24">
        <Card
          className={cn(
            surfaceVariants({ variant: 'card' }),
            'p-3 md:gap-4 md:p-4 lg:gap-6 lg:p-6 xl:p-8 2xl:p-12 mx-auto max-w-screen-lg md:flex',
          )}
        >
          <ResumeHeader
            name={props.name}
            jobTitle={props.jobTitle}
            location={props.location}
            links={props.links}
            className="-mt-16 md:sticky md:top-8 md:mt-0 md:w-1/3 md:self-start"
          />
          <div className="md:w-2/3">{props.children}</div>
        </Card>
      </article>
    </SiteWrapper>
  );
};
