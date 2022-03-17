import React, { useEffect, useRef } from 'react';

import Link from 'next/link';
import cx from 'classnames';
import { RichText } from 'prismic-reactjs';

import HeaderNav from 'routes/home/components/header-nav/HeaderNav';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';

import styles from './IntroLanding.module.scss';

function IntroLanding(props) {
  const letters = useRef(new Letters());

  const onEyeClick = () => {
    window.scrollTo(0, window.innerHeight);
  };

  return (
    <article>
      <HeaderNav onEyeClick={onEyeClick} isEyeActive={false} />
      <CanvasHero entities={[letters.current]} />
      <div className={cx(styles.welcome)}>
        <div className={styles.copy}>
          <RichText render={props.document?.data?.introduction} />
        </div>
      </div>
      <Link href="/the-damn-game">
        <a className={cx(styles.play)}>
          <span className={styles.playKill}>Kill</span>{' '}
          <span className={styles.playTv}>TV!</span>
        </a>
      </Link>
    </article>
  );
}

export default IntroLanding;
