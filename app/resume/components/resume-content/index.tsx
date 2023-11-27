import { RichText } from 'prismic-reactjs';
import clsx from 'clsx';
import React from 'react';
import { Prose } from '@/components/typography/prose';

export const ResumeContent = (props) => {
  return (
    <Prose className={clsx({ 'prose-lg': props.primary.large_copy })}>
      <RichText render={props.primary.title} />
      <RichText render={props.primary.content} />
    </Prose>
  );
};
