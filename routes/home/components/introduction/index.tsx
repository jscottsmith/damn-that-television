import React from 'react';
import { RichText } from 'prismic-reactjs';
import clsx from 'clsx';
import styles from './index.module.scss';

export const Introduction = (props) => {
  return (
    <div className={clsx(styles.welcome)}>
      <div className={styles.copy}>
        <RichText render={props.document?.data?.introduction} />
      </div>
    </div>
  );
};
