import React from 'react';
import clsx from 'clsx';
import { RichText } from 'prismic-reactjs';
import styles from './index.module.scss';
import { CardSecondary } from '@/components/card';
import { Prose } from '@/components/typography/prose';

export const Introduction = (props) => {
  return (
    <div className={clsx(styles.welcome)}>
      <CardSecondary className={clsx('p-md md:p-lg')}>
        <Prose className="prose-lg lg:prose-xl xl:prose-2xl max-w-2xl">
          <RichText render={props.document?.data?.introduction} />
        </Prose>
      </CardSecondary>
    </div>
  );
};
