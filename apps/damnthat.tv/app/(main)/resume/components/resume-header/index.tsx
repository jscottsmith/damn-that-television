import Image from 'next/image';
import { Links } from 'app/(main)/resume/components/resume-header/components/links';
import type { ResumeLinkGroup } from '../../../../../lib/content/types';
import avatar from '../../../../../public/static/avatar.jpg';

export const ResumeHeader = (props: {
  name: string;
  jobTitle: string;
  location: string;
  links: ResumeLinkGroup[];
  className?: string;
}) => {
  return (
    <header className={props.className}>
      <div className="mx-auto w-32 overflow-hidden rounded-full border-4 border-solid border-white shadow-md">
        <Image src={avatar} alt="J Scott Smith" placeholder="blur" />
      </div>

      <section className="mt-3 mb-6 text-center">
        <div className="font-futura text-foreground mb-3 text-4xl">
          {props.name}
        </div>
        <div className="font-futura text-foreground mb-1 text-xl font-medium italic">
          {props.jobTitle}
        </div>
        <div className="text-muted-foreground">{props.location}</div>
      </section>

      <div className="grid-cols-3 sm:grid md:block">
        {props.links.map((group) => (
          <Links group={group} key={group.title} />
        ))}
      </div>
    </header>
  );
};
