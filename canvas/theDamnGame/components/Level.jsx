import React, { Component } from 'react';
import TheDamnGame from '../TheDamnGame';

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
    }

    render() {
        return (
            <div className={styles.canvas}>
                <canvas ref={(ref) => (this.canvas = ref)} />
            </div>
        );
    }
}
