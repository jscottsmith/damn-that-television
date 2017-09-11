import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from 'Styles/components/_damnit.scss';
import DamnitGame from 'Universal/damnit/index.js';

export default class Damnit extends Component {
    static propTypes = {
        startGame: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.game = DamnitGame.init(this.canvas);
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.startGame !== nextProps.startGame &&
            nextProps.startGame
        ) {
            this.game.start();
        }
    }

    render() {
        return (
            <div>
                <canvas
                    className={styles.canvas}
                    ref={ref => (this.canvas = ref)}
                />
            </div>
        );
    }
}
