import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from 'Styles/components/_damnit.scss';
import DamnitGame from 'Universal/damnit/index.js';

export default class Damnit extends Component {
    static propTypes = {
        isPlaying: PropTypes.bool.isRequired,
        handleStop: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.game = DamnitGame.init(this.canvas);
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isPlaying !== nextProps.isPlaying &&
            nextProps.isPlaying
        ) {
            this.play();
        }

        if (
            this.props.isPlaying !== nextProps.isPlaying &&
            !nextProps.isPlaying
        ) {
            this.stop();
        }
    }

    play = () => {
        this.game.play();
    };

    stop = () => {
        this.game.stop();
    };

    render() {
        return (
            <div
                className={cx(styles.gameContainer, {
                    'is-playing': this.props.isPlaying,
                })}
            >
                <button
                    className={styles.pauseBtn}
                    onClick={this.props.handleStop}
                >
                    Pause
                </button>
                <canvas
                    className={styles.canvas}
                    ref={ref => (this.canvas = ref)}
                />
            </div>
        );
    }
}
