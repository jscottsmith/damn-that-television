import type { Metadata } from 'next';
import { METADATA } from '@/constants/app';
import { defaultContentRoot } from '../../../lib/content/images';
import { getResume } from '../../../lib/content/read';
import { renderContentMdx } from '../../../lib/content/render';
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
  const body = await renderContentMdx(resume.body, {
    contentRoot,
    directory: resume.directory,
    prose: false,
    components: createResumeMdxComponents({
      contentRoot,
      directory: resume.directory,
    }),
  });

  return (
    <Resume
      name={resume.name}
      jobTitle={resume.jobTitle}
      location={resume.location}
      links={resume.links}
    >
      {body}
    </Resume>
  );
}
