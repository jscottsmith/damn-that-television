import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { Links } from 'app/(main)/resume/components/resume-header/components/links';

export const ResumeHeader = (props) => {
  return (
    <header className={props.className}>
      <div className="mx-auto w-32 overflow-hidden rounded-full border-4 border-solid border-white shadow-md">
        <Image
          src="/static/avatar.jpg"
          alt="J Scott Smith"
          width={300}
          height={300}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      <section className="mb-lg mt-base text-center">
        <div className="mb-base font-futura text-4xl text-slate-700 dark:text-slate-300">
          <RichText render={props.document.data.name} />
        </div>
        <div className="mb-xs font-futura text-xl font-medium italic text-slate-700 dark:text-slate-300">
          <RichText render={props.document.data.current_job_title} />
        </div>
        <div className="text-slate-500">
          <RichText render={props.document.data.current_role_location} />
        </div>
      </section>

      <div className="grid-cols-3 sm:grid md:block">
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
