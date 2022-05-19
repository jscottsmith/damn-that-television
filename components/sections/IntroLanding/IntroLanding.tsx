import React, { useEffect, useRef } from 'react';

import Link from 'next/link';
import cx from 'classnames';
import { RichText } from 'prismic-reactjs';

import { HeaderNav } from '@/routes/home/components/header-nav';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';

import styles from './IntroLanding.module.scss';
import { RecruiterBadge } from '@/components/recruiter-badge';
import { PointerFinger } from '@/components/pointer-finger';
import { ROUTE_RESUME } from '@/routes/routes.constants';
import { WORK_TOGETHER_ID } from '@/routes/resume/components/work-together';

function IntroLanding(props) {
  const letters = useRef(new Letters());

  return (
    <article>
      <HeaderNav />
      <CanvasHero entities={[letters.current]} />
      <div className={cx(styles.welcome)}>
        <div className={styles.copy}>
          <RichText render={props.document?.data?.introduction} />
        </div>
      </div>
      <Link href={`${ROUTE_RESUME}#${WORK_TOGETHER_ID}`}>
        <a>
          <RecruiterBadge className="-top-0 -right-2 absolute z-10 w-64 md:w-96 h-64 md:h-96 text-2xl">
            <PointerFinger className="w-16 h-16 md:w-24 md:h-24" />
          </RecruiterBadge>
        </a>
      </Link>
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
