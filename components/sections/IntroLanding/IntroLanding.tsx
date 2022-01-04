import React, { PureComponent } from 'react';
import Link from 'next/link';
import cx from 'classnames';

// components
import { Copy } from '@/components/copy';
import HeaderNav from 'routes/home/components/header-nav/HeaderNav';
import { CanvasHero } from '@/components/canvas-hero';
import Letters from 'canvas/letters/LetterDrop';

import styles from './IntroLanding.module.scss';
import content from 'markdown/landing-intro.md';

export default class Home extends PureComponent {
  constructor() {
    super();
    this.letters = new Letters();
  }

  onEyeClick = () => {
    window.scrollTo(0, window.innerHeight);
  };

  render() {
    return (
      <article>
        <HeaderNav onEyeClick={this.onEyeClick} isEyeActive={false} />
        <CanvasHero entities={[this.letters]} />
        <div className={cx(styles.welcome)}>
          <Copy className={styles.copy}>{content}</Copy>
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
}
