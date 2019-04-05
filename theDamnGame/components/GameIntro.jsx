import React, { Component } from 'react';
import styles from './GameIntro.scss';

export default class GameIntro extends Component {
    render() {
        return (
            <div className={styles.gameIntro}>
                <div>
                    <h1>Damn TV!</h1>
                    <p>
                        Space, Click or Tap to shoot.
                        <br />
                        Mouse or Touch to move.
                        <br />
                        Kill TVs to win.
                    </p>
                    <button
                        className={styles.start}
                        onClick={this.props.handleStart}
                    >
                        Start
                    </button>
                </div>
            </div>
        );
    }
}
