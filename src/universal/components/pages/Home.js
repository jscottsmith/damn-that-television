import React, { PureComponent } from 'react';
import Damnit from 'Organisms/Damnit.js';
import cx from 'classnames';
import styles from 'Styles/pages/_index.scss';
import Copy from 'Atoms/Copy';
import content from 'content/home/home.md';

export default class Home extends PureComponent {
    state = {
        startGame: false,
    };

    handlePlay = () => {
        this.setState(() => ({
            startGame: true,
        }));
    };

    render() {
        return (
            <article className={cx('page-index', styles.index)}>
                <div
                    className={cx(styles.welcome, {
                        'is-hidden': this.state.startGame,
                    })}
                >
                    <Copy>{content}</Copy>
                    <button className={styles.play} onClick={this.handlePlay}>
                        Start
                    </button>
                </div>
                <Damnit startGame={this.state.startGame} />
            </article>
        );
    }
}
