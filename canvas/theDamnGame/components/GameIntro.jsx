import React, { Component } from 'react';
import styles from './GameIntro.scss';

export default class GameIntro extends Component {
    render() {
        return (
            <div className={styles.gameIntro}>
                <div>
                    <h1>Damn TV!</h1>
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
