import Image from 'next/image';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { AVATAR_PATH } from 'app/resume';
import { Links } from 'app/resume/components/resume-header/components/links';
import { Prose } from '@/components/typography/prose';

export const ResumeHeader = (props) => {
  return (
    <header className={props.className}>
      <div className="mx-auto w-32 rounded-full overflow-hidden border-4 border-solid border-white shadow-md">
        <Image
          src={AVATAR_PATH}
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

      <Prose asChild>
        <section className="text-center">
          <RichText render={props.document.data.name} />
          <RichText render={props.document.data.current_job_title} />
          <div className="text-xs">
            <RichText render={props.document.data.current_role_location} />
          </div>
        </section>
      </Prose>

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
