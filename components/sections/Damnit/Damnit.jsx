import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Damnit.scss';
import DamnitGame from '../../../canvas/damnit/index.js';

export default class Damnit extends Component {
    static propTypes = {
        isPlaying: PropTypes.bool.isRequired,
        handleStop: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.game = DamnitGame.init(this.canvas);
        this.props.isPlaying && this.play();
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
                    [styles.playing]: this.props.isPlaying,
                })}
            >
                <button
                    className={styles.pauseBtn}
                    onClick={this.props.handleStop}
                >
                    Escape
                </button>
                <div className={styles.canvas}>
                    <canvas ref={(ref) => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}
