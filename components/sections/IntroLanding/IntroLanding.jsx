import React, { PureComponent } from 'react';
import Link from 'next/link';
import cx from 'classnames';

// components
import Copy from 'components/atoms/Copy';
import HeaderNav from 'components/molecules/HeaderNav/HeaderNav';
import CanvasBackground from 'components/molecules/CanvasBackground/CanvasBackground';

import styles from './IntroLanding.scss';
import content from 'markdown/landing-intro.md';

export default class Home extends PureComponent {
    state = {
        isWaiting: true,
    };

    componentDidMount() {
        this.wait = setTimeout(() => {
            this.setState({ isWaiting: false });
            this.wait = null;
        }, 3000);
    }

    componentWillUnmount() {
        this.wait && clearTimeout(this.wait);
    }

    toggleInfo = () =>
        this.setState(({ isWaiting }) => ({ isWaiting: !isWaiting }));

    render() {
        return (
            <article className={cx('page-index', styles.root)}>
                <HeaderNav
                    onEyeClick={this.toggleInfo}
                    isEyeActive={!this.state.isWaiting}
                />
                <div
                    className={cx(styles.welcome, {
                        [styles.waiting]: this.state.isWaiting,
                    })}
                >
                    <Copy>{content}</Copy>
                </div>
                <CanvasBackground />
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
