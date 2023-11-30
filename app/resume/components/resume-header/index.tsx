import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { Links } from 'app/resume/components/resume-header/components/links';

export const ResumeHeader = (props) => {
  return (
    <header className={props.className}>
      <div className="mx-auto w-32 rounded-full overflow-hidden border-4 border-solid border-white shadow-md">
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

      <section className="text-center mt-base mb-lg">
        <div className="font-futura text-4xl mb-base text-slate-700 dark:text-slate-300">
          <RichText render={props.document.data.name} />
        </div>
        <div className="font-futura font-medium italic text-xl text-slate-700 dark:text-slate-300 mb-xs">
          <RichText render={props.document.data.current_job_title} />
        </div>
        <div className="text-slate-500">
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
