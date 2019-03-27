import React, { Component } from 'react';
import Link from 'next/link';
import TheDamnGame from '../TheDamnGame';
import LevelInterface from './LevelInterface';

import GameStore from '../store/GameStore';
import { resetGameState } from '../actions/globalActions';
import { Provider } from 'react-redux';
import styles from './TheDamnGameContainer.scss';

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
            <Provider store={GameStore}>
                <LevelInterface />
                <Link href="/">
                    <a className={styles.pauseBtn}>Escape</a>
                </Link>
                <div className={styles.canvas}>
                    <canvas ref={(ref) => (this.canvas = ref)} />
                </div>
            </Provider>
        );
    }
}
