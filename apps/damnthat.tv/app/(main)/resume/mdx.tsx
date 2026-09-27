import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from 'react';
import {
  contentImageDimensions,
  resolveContentImageSrc,
} from '../../../lib/content/images';
import { Award, ResumeAwards } from './components/resume-awards';
import { ResumeContent } from './components/resume-content';
import { ResumeEducation, School } from './components/resume-education';
import { Item, ResumeList } from './components/resume-list';
import {
  Job,
  ResumeWorkHistory,
  type WorkHistoryJobProps,
} from './components/resume-work-history';
import {
  CondensedJob,
  ResumeWorkHistoryCondensed,
} from './components/resume-work-history-condensed';
import { WorkTogether } from './components/work-together';

function resolveJobLogos(
  children: ReactNode,
  resolve: (src: string) => string,
) {
  return Children.map(children, (child) => {
    if (!isValidElement<WorkHistoryJobProps>(child) || child.type !== Job) {
      return child;
    }

    if (!child.props.logo) {
      return child;
    }

    const logo = resolve(child.props.logo);
    const size = contentImageDimensions(logo);

    return cloneElement(child, {
      logo,
      logoWidth: size?.width ?? 256,
      logoHeight: size?.height ?? 256,
    });
  });
}

export function createResumeMdxComponents(input: {
  contentRoot: string;
  directory: string;
}) {
  function resolve(src: string) {
    return resolveContentImageSrc(input.contentRoot, input.directory, src);
  }

  return {
    ResumeContent,
    WorkTogether,
    WorkHistory: function WorkHistory(props: {
      title?: string;
      children?: ReactNode;
    }) {
      return (
        <ResumeWorkHistory title={props.title}>
          {resolveJobLogos(props.children, resolve)}
        </ResumeWorkHistory>
      );
    },
    Job,
    ResumeList,
    Item,
    Education: ResumeEducation,
    School,
    Awards: ResumeAwards,
    Award,
    WorkHistoryCondensed: ResumeWorkHistoryCondensed,
    CondensedJob,
  };
}
