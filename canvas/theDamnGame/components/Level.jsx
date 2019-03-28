import React, { Component } from 'react';
import TheDamnGame from '../TheDamnGame';

import GameStore from '../store/GameStore';
import { resetGameState } from '../actions/globalActions';
import styles from './TheDamnGameContainer.scss';

export default class Level extends Component {
    componentDidMount() {
        this.game = TheDamnGame.init({
            canvas: this.canvas,
            config: this.props.config,
        });
    }

    componentWillUnmount() {
        this.game.stop();
        this.game.destroy();
        // GameStore.dispatch(resetGameState);
    }

    render() {
        return (
            <div className={styles.canvas}>
                <canvas ref={(ref) => (this.canvas = ref)} />
            </div>
        );
    }
}
