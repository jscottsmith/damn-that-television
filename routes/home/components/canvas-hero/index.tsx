import React, { PureComponent, useImperativeHandle } from 'react';

import styles from './index.module.scss';
import { Canvas } from '@gush/candybar';

// import Eraser from 'canvas/eraser/Eraser';
import Letters from 'canvas/letters/LetterDrop';
export default class CanvasBackground extends PureComponent {
  componentDidMount() {
    const entity = new Letters();

    this.canvas = new Canvas({
      dpr: window.devicePixelRatio || 1,
      canvas: this._canvas,
      container: this._container,
      hasPointer: true,
      pauseInBackground: true,
      entities: [entity],
    });
  }

  componentWillUnmount() {
    this.canvas.destroy();
  }

  render() {
    return (
      <div className={styles.container} ref={(ref) => (this._container = ref)}>
        <canvas ref={(ref) => (this._canvas = ref)} />
      </div>
    );
  }
}
