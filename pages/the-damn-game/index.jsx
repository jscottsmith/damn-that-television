import React, { Component } from 'react';
import Link from 'next/link';

import cx from 'classnames';
import styles from './the-damn-game.scss';
import TheDamnGame from 'canvas/theDamnGame/TheDamnGame';
import GameStore from 'canvas/theDamnGame/store/GameStore';
import { resetGameState } from 'canvas/theDamnGame/actions/playerActions';

export default class TheDamnGameContainer extends Component {
    componentDidMount() {
        this.game = TheDamnGame.init(this.canvas);
    }

    componentWillUnmount() {
        this.game.destroy();
        GameStore.dispatch(resetGameState);
    }

    render() {
        return (
            <div className={cx(styles.gameContainer)}>
                <Link href="/">
                    <a className={styles.pauseBtn}>Escape</a>
                </Link>
                <div className={styles.canvas}>
                    <canvas ref={(ref) => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}
