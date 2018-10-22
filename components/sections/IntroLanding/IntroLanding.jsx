import React, { PureComponent } from 'react';
import cx from 'classnames';
import Observed from 'react-observed';
import styles from './IntroLanding.scss';
import Copy from 'components/atoms/Copy';
import Damnit from 'components/sections/Damnit/Damnit';
import EraserBackground from 'components/molecules/EraserBackground/EraserBackground';
import content from 'markdown/landing-intro.md';

export default class Home extends PureComponent {
    state = {
        isPlaying: false,
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

    handlePlay = () => {
        this.setState({ isPlaying: true });
    };

    handleStop = () => {
        this.setState({ isPlaying: false });
    };

    render() {
        return (
            <article className={cx('page-index', styles.index)}>
                <div
                    className={cx(styles.welcome, {
                        [styles.playing]: this.state.isPlaying,
                        [styles.waiting]: this.state.isWaiting,
                    })}
                >
                    <Copy>{content}</Copy>
                    <button className={styles.play} onClick={this.handlePlay}>
                        Kill TV!
                    </button>
                </div>
                <EraserBackground isPaused={this.state.isPlaying} />
                <Damnit
                    isPlaying={this.state.isPlaying}
                    handleStop={this.handleStop}
                />
            </article>
        );
    }
}