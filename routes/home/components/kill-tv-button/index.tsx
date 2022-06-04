import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

export const KillTVButton = () => {
  return (
    <Link href="/the-damn-game">
      <a className={cx(styles.play)}>
        <span className={styles.playKill}>Kill</span>{' '}
        <span className={styles.playTv}>TV!</span>
      </a>
    </Link>
  );
};
