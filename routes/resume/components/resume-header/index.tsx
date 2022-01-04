import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { AVATAR_PATH } from 'routes/resume';
import { Links } from 'routes/resume/components/resume-header/components/links';

export const ResumeHeader = (props) => {
  return (
    <header className={props.className}>
      <div className="mx-auto w-32 rounded-full overflow-hidden border-4 border-solid border-white shadow-md">
        <Image
          src={AVATAR_PATH}
          alt="J Scott Smith"
          width={300}
          height={300}
          layout="responsive"
        />
      </div>

      <section className="text-center prose prose-a:text-club-500">
        <RichText render={props.document.data.name} />
        <RichText render={props.document.data.current_job_title} />
        <div className="text-xs">
          <RichText render={props.document.data.current_role_location} />
        </div>
      </section>

      <div className="sm:grid grid-cols-3 md:block">
        {props.document.data.body.map((slice, i) => {
          if (slice.slice_type === 'links') {
            return <Links links={slice} key={i} />;
          }
          return null;
        })}
      </div>
    </header>
  );
};
