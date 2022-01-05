import React from 'react';
import Helmet from 'react-helmet';
import Eye from 'components/eye';
import { ResumeHeader } from './components/resume-header';
import { ResumeContent } from './components/resume-content';
import { ResumeWorkHistory } from './components/resume-work-history';
import { ResumeWorkHistoryCondensed } from './components/resume-work-history-condensed';
import { ResumeList } from './components/resume-list';
import { ResumeAwards } from './components/resume-awards';
import Link from 'next/link';
import HeaderNav from 'routes/home/components/header-nav/HeaderNav';

const DESC = 'Résumé of J Scott Smith, a creative web developer.';
export const AVATAR_PATH = '/static/avatar.jpg';

function getMeta(pathname) {
  return [
    { name: 'description', content: DESC },
    { name: 'twitter:description', content: DESC },
    { name: 'twitter:image', content: AVATAR_PATH },
    { property: 'og:url', content: pathname },
    { property: 'og:description', content: DESC },
    { property: 'og:image', content: AVATAR_PATH },
  ];
}

export const Resume = (props) => {
  return (
    <>
      <Link href="/" passHref>
        <a>
          <HeaderNav isEyeActive={false} />
        </a>
      </Link>
      <Helmet title="Résumé" meta={getMeta(props.router.pathname)} />
      <article className="bg-gray-100 p-sm pt-4xl md:p-md lg:p-lg xl:p-xl 2xl:p-2xl">
        <div className="max-w-screen-lg mx-auto rounded-md bg-white shadow-xl p-sm md:p-md lg:p-lg xl:p-xl 2xl:p-2xl md:flex md:gap-md lg:gap-lg">
          <ResumeHeader
            document={props.document}
            className="-mt-3xl md:mt-0 md:w-1/3 md:sticky md:top-xl md:self-start"
          />
          <div className="md:w-2/3">
            {props.document.data.body.map((slice, i) => {
              if (slice.slice_type === 'resume_work_history') {
                return <ResumeWorkHistory {...slice} key={i} />;
              }
              if (slice.slice_type === 'resume_work_history_condensed') {
                return <ResumeWorkHistoryCondensed {...slice} key={i} />;
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
        </div>
        <footer>
          <Eye className="mt-xl text-lunar w-10 mx-auto" />
        </footer>
      </article>
    </>
  );
};
