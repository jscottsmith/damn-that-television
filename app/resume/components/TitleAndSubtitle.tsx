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
        'font-futura text-slate-700 dark:text-slate-200 flex flex-wrap',
      )}
    >
      <span className="inline-block font-medium">
        <RichText render={props.title} />
      </span>
      {hasSub && (
        <>
          <span className="my-1 mx-md border-peach dark:border-pepto border-solid border-r-2 inline-block" />
          <span className="font-light inline-block italic">
            <RichText render={props.subtitle} />
          </span>
        </>
      )}
    </div>
  );
}
