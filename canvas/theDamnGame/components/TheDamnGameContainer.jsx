import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Link from 'next/link';
import LevelController from './LevelController';
import LevelComplete from './LevelComplete';
import GameIntro from './GameIntro';
import Fade from './Fade';

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
                return (
                    <Fade
                        key="1"
                        // in={gameStates.GAME_START === this.state.gameState}
                    >
                        <GameIntro handleStart={this.handleStart} />
                    </Fade>
                );

            case gameStates.GAME_END:
                return (
                    <Fade
                        key="2"
                        // in={gameStates.GAME_END === this.state.gameState}
                    >
                        <div>End</div>
                    </Fade>
                );

            case gameStates.LEVEL_COMPLETE:
                return (
                    <Fade
                        key="3"
                        // in={gameStates.LEVEL_COMPLETE === this.state.gameState}
                    >
                        <LevelComplete handleStart={this.handleStart} />
                    </Fade>
                );

            case gameStates.PLAYING:
                return (
                    <Fade
                        key="4"
                        // in={gameStates.PLAYING === this.state.gameState}
                    >
                        <LevelController handleComplete={this.handleComplete} />
                    </Fade>
                );

            default:
                return null;
        }
    }

    handleStart = () => this.setState({ gameState: gameStates.PLAYING });

    handleComplete = () =>
        this.setState({ gameState: gameStates.LEVEL_COMPLETE });

    render() {
        return (
            <Fade in>
                <Provider store={GameStore}>
                    <Link href="/">
                        <a className={styles.escBtn}>ESC</a>
                    </Link>
                    <TransitionGroup>{this._getComponent()}</TransitionGroup>
                </Provider>
            </Fade>
        );
    }
}
