import React from 'react';
import clsx from 'clsx';
import { RichText } from 'prismic-reactjs';
import styles from './index.module.scss';
import { CardSecondary } from '@/components/card';
import { Prose } from '@/components/typography/prose';
import { Marquee } from '@/components/marquee';

export const INTRO_ID = 'who';

export const Introduction = (props) => {
  return (
    <article className={clsx(styles.welcome)} id={INTRO_ID}>
      <CardSecondary className={clsx('p-md md:p-lg')}>
        <Prose className="prose-lg max-w-2xl lg:prose-xl xl:prose-2xl">
          <RichText render={props.document?.data?.introduction} />
        </Prose>
      </CardSecondary>
    </article>
  );
};
