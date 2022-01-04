import React, { Component } from 'react';
import styles from './GameIntro.module.scss';

export default class GameIntro extends Component {
  render() {
    return (
      <div className={styles.gameIntro}>
        <div className="prose">
          <h2>Damn TV!</h2>
          <p>
            Space, Click or Tap to shoot.
            <br />
            Mouse or Touch to move.
            <br />
            Kill TVs to win.
          </p>
          <button className={styles.start} onClick={this.props.handleStart}>
            Start
          </button>
        </div>
      </div>
    );
  }
}
