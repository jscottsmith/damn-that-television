import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export const KillTVButton = () => {
  return (
    <Link href="/the-damn-game" className={clsx(styles.play)}>
      <span className={styles.playKill}>Kill</span>{' '}
      <span className={styles.playTv}>TV!</span>
    </Link>
  );
};
