import React, { Component } from 'react';
import Link from 'next/link';
import LevelController from './LevelController';
import LevelComplete from './LevelComplete';
import GameIntro from './GameIntro';

import GameStore from '../store/GameStore';
import { Provider } from 'react-redux';
import styles from './TheDamnGameContainer.scss';

const gameStates = {
    PLAYING: 'PLAYING',
    GAME_START: 'GAME_START',
    GAME_END: 'GAME_END',
    LEVEL_COMPLETE: 'LEVEL_COMPLETE',
};

export default class TheDamnGameContainer extends Component {
    state = {
        gameState: gameStates.GAME_START,
    };

    _getComponent() {
        switch (this.state.gameState) {
            case gameStates.GAME_START:
                return <GameIntro handleStart={this.handleStart} />;

            case gameStates.GAME_END:
                return <div>End</div>;

            case gameStates.LEVEL_COMPLETE:
                return <LevelComplete handleStart={this.handleStart} />;

            case gameStates.PLAYING:
                return <LevelController handleComplete={this.handleComplete} />;

            default:
                return null;
        }
    }

    handleStart = () => this.setState({ gameState: gameStates.PLAYING });

    handleComplete = () =>
        this.setState({ gameState: gameStates.LEVEL_COMPLETE });

    render() {
        return (
            <Provider store={GameStore}>
                <Link href="/">
                    <a className={styles.pauseBtn}>Escape</a>
                </Link>
                {this._getComponent()}
            </Provider>
        );
    }
}
