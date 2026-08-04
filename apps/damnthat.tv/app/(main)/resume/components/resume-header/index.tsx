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

      <section className="mt-3 mb-6 text-center">
        <div className="font-futura text-foreground mb-3 text-4xl">
          <PrismicRichText field={props.document.data.name} />
        </div>
        <div className="font-futura text-foreground mb-1 text-xl font-medium italic">
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
