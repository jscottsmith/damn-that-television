import type { Metadata } from 'next';
import { METADATA } from '@/constants/app';
import { defaultContentRoot } from '../../../lib/content/images';
import { getResume } from '../../../lib/content/read';
import { renderContentMdx } from '../../../lib/content/render';
import { ResumeAwards } from './components/resume-awards';
import { ResumeEducation } from './components/resume-education';
import { ResumeList } from './components/resume-list';
import { ResumeWorkHistory } from './components/resume-work-history';
import { Resume } from './Resume';
import { createResumeMdxComponents } from './mdx';

export const metadata: Metadata = {
  title: `Résumé | J Scott Smith | ${METADATA.title}`,
  description:
    'Résumé of J Scott Smith, engineering leader and creative developer.',
};

export default async function Page() {
  const resume = getResume();
  const contentRoot = defaultContentRoot();
  const narrative = await renderContentMdx(resume.body, {
    contentRoot,
    directory: resume.directory,
    prose: false,
    components: createResumeMdxComponents(),
  });
  const jobs = await Promise.all(
    resume.jobs.map(async (job) => {
      const { body, ...fields } = job;

      return {
        ...fields,
        description: body
          ? await renderContentMdx(body, {
              contentRoot,
              directory: resume.directory,
              prose: false,
            })
          : null,
      };
    }),
  );

  return (
    <Resume
      name={resume.name}
      jobTitle={resume.jobTitle}
      company={resume.company}
      location={resume.location}
      links={resume.links}
    >
      {narrative}
      <ResumeWorkHistory title="Experience" jobs={jobs} />
      <ResumeList
        title="Technologies"
        intro={resume.technologies.intro}
        items={resume.technologies.items}
      />
      <ResumeList title="Interests" items={resume.interests} />
      <ResumeEducation title="Education" schools={resume.education} />
      <ResumeAwards title="Awards & Honors" awards={resume.awards} />
    </Resume>
  );
}
