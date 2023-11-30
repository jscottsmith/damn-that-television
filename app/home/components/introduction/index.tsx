import React from 'react';
import clsx from 'clsx';
import { RichText } from 'prismic-reactjs';
import styles from './index.module.scss';
import { CardSecondary } from '@/components/card';

export const Introduction = (props) => {
  return (
    <div className={clsx(styles.welcome)}>
      <CardSecondary className={clsx(styles.copy, 'p-md md:p-lg')}>
        <RichText render={props.document?.data?.introduction} />
      </CardSecondary>
    </div>
  );
};
