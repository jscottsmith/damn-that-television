import Image from 'next/image';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import { Links } from 'app/(main)/resume/components/resume-header/components/links';
import avatar from '../../../../../public/static/avatar.jpg';

export const ResumeHeader = (props) => {
  return (
    <header className={props.className}>
      <div className="mx-auto w-32 overflow-hidden rounded-full border-4 border-solid border-white shadow-md">
        <Image src={avatar} alt="J Scott Smith" placeholder="blur" />
      </div>

      <section className="mb-6 mt-3 text-center">
        <div className="mb-3 font-futura text-4xl text-foreground">
          <PrismicRichText field={props.document.data.name} />
        </div>
        <div className="mb-1 font-futura text-xl font-medium text-foreground italic">
          <PrismicRichText field={props.document.data.current_job_title} />
        </div>
        <div className="text-muted-foreground">
          <PrismicRichText field={props.document.data.current_role_location} />
        </div>
      </section>

      <div className="grid-cols-3 sm:grid md:block">
        {props.document.data.body.map((slice, i) => {
          if (slice.slice_type === 'Links') {
            return <Links links={slice} key={i} />;
          }
          return null;
        })}
      </div>
    </header>
  );
};
