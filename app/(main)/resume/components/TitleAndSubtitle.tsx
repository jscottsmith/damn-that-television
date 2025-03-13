import clsx from 'clsx';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

export function TitleAndSubtitle(props: {
  title: RichTextBlock[];
  subtitle?: RichTextBlock[];
  className?: string;
}) {
  const hasSub = !!props.subtitle?.length;
  return (
    <div
      className={clsx(
        props.className,
        'flex flex-wrap font-futura text-slate-700 dark:text-slate-200',
      )}
    >
      <span className="inline-block font-medium">
        <RichText render={props.title} />
      </span>
      {hasSub && (
        <>
          <span className="mx-md my-1 inline-block border-r-2 border-solid border-peach dark:border-club-700" />
          <span className="inline-block font-light italic">
            <RichText render={props.subtitle} />
          </span>
        </>
      )}
    </div>
  );
}
