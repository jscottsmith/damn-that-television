'use client';
import React, { Component } from 'react';
import Link from 'next/link';
import LevelController from './LevelController';
import LevelComplete from './LevelComplete';
import GameIntro from './GameIntro';

import gameStore from '../store/gameStore';
import { Provider } from 'react-redux';
import styles from './TheDamnGameContainer.module.scss';

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
        return <GameIntro key="1" handleStart={this.handleStart} />;

      case gameStates.GAME_END:
        return <div key="2">End</div>;

      case gameStates.LEVEL_COMPLETE:
        return <LevelComplete key="3" handleStart={this.handleStart} />;

      case gameStates.PLAYING:
        return <LevelController key="4" handleComplete={this.handleComplete} />;

      default:
        return null;
    }
  }

  handleStart = () => this.setState({ gameState: gameStates.PLAYING });

  handleComplete = () =>
    this.setState({ gameState: gameStates.LEVEL_COMPLETE });

  render() {
    return (
      <Provider store={gameStore}>
        <Link href="/" className={styles.escBtn}>
          ESC
        </Link>
        <div>{this._getComponent()}</div>
      </Provider>
    );
  }
}
