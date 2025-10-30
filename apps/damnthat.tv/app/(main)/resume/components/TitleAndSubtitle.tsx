import clsx from 'clsx';
import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/client';

export function TitleAndSubtitle(props: {
  title: RichTextField;
  subtitle?: RichTextField;
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
        <PrismicRichText field={props.title} />
      </span>
      {hasSub && (
        <>
          <span className="mx-md my-1 inline-block border-r-2 border-solid border-peach dark:border-club-700" />
          <span className="inline-block font-light italic">
            <PrismicRichText field={props.subtitle} />
          </span>
        </>
      )}
    </div>
  );
}
