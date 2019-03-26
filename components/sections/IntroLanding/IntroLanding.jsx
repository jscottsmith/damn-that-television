import React, { PureComponent } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import styles from './IntroLanding.scss';
import Copy from 'components/atoms/Copy';
import EraserBackground from 'components/molecules/EraserBackground/EraserBackground';
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

    render() {
        return (
            <article className={cx('page-index', styles.index)}>
                <div
                    className={cx(styles.welcome, {
                        [styles.waiting]: this.state.isWaiting,
                    })}
                >
                    <Copy>{content}</Copy>
                </div>
                <EraserBackground isPaused={false} />
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
