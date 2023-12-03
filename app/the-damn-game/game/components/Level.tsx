import React, { Component } from 'react';
import LevelView from '../LevelView';

import styles from './TheDamnGameContainer.module.scss';

export default class Level extends Component {
  game: any;
  canvas: any;
  props: any;

  componentDidMount() {
    this.game = LevelView.init({
      canvas: this.canvas,
      config: this.props.config,
      assets: this.props.assets,
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
