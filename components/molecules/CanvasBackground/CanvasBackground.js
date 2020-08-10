import React, { PureComponent } from 'react';

import styles from './CanvasBackground.scss';
import { Canvas } from '@gush/candybar';

// import Eraser from 'canvas/eraser/Eraser';
import Vision from 'canvas/vision/Vision';
// import Letters from 'canvas/letters/LetterDrop';
// import WavingArm from 'canvas/waving-arm/WavingArm';

export default class CanvasBackground extends PureComponent {
  componentDidMount() {
    const entity = new Vision();

    this.canvas = new Canvas({
      dpr: 1,
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
      <div className={styles.container}>
        <canvas ref={(ref) => (this._canvas = ref)} />
      </div>
    );
  }
}
