import React, { PureComponent } from 'react';
import Damnit from 'Organisms/Damnit.js';
import cx from 'classnames';
import styles from 'Styles/pages/_index.scss';
import Copy from 'Atoms/Copy';
import content from 'content/home/home.md';

export default class Home extends PureComponent {
    state = {
        isPlaying: false,
    };

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
                        'is-hidden': this.state.isPlaying,
                    })}
                >
                    <Copy>{content}</Copy>
                    <button className={styles.play} onClick={this.handlePlay}>
                        📺 Go! 👊🏻
                    </button>
                </div>
                <Damnit
                    isPlaying={this.state.isPlaying}
                    handleStop={this.handleStop}
                />
            </article>
        );
    }
}
