import { RichText } from 'prismic-reactjs';
import clsx from 'clsx';
import React from 'react';

export const ResumeContent = (props) => {
  return (
    <div className={clsx('prose', { 'prose-lg': props.primary.large_copy })}>
      <RichText render={props.primary.title} />
      <RichText render={props.primary.content} />
    </div>
  );
};
