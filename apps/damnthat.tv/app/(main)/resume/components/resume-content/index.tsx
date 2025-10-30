import clsx from 'clsx';
import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { Prose } from '@/components/typography/prose';
import { SectionTitle } from '../SectionTitle';
import type { ResumeContentSlice } from '../../../../../prismicio-types';

export const ResumeContent = (props: ResumeContentSlice) => {
  return (
    <>
      <SectionTitle text={props.primary.title} />
      <Prose className={clsx({ 'prose-xl': props.primary.large_copy })}>
        <PrismicRichText field={props.primary.content} />
      </Prose>
    </>
  );
};
