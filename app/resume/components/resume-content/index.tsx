import { RichText } from 'prismic-reactjs';
import clsx from 'clsx';
import React from 'react';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';

export const ResumeContent = (props) => {
  return (
    <>
      <SectionTitle text={props.primary.title} />
      <Prose className={clsx({ 'prose-xl': props.primary.large_copy })}>
        <RichText render={props.primary.content} />
      </Prose>
    </>
  );
};
