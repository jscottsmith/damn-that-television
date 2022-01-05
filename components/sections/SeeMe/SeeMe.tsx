import React, { Component } from 'react';
import styles from './SeeMe.module.scss';
import Observed from 'react-observed';
import { Canvas } from '@gush/candybar';
import Eye from '../../../canvas/eyes/Eye';
import Background from '../../../canvas/common/Background';
import { OBSERVER_OPTIONS } from 'constants/app';

export default class SeeMe extends Component {
  canvas: any;
  _canvas: any;
  _container: any;

  componentDidMount() {
    this.runIt();
  }

  runIt() {
    const getPropsRight = ({ canvas, dpr }) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const radius = (Math.max(cw, ch) / 20) * dpr;
      return {
        radius,
        x: (cw / 2) * dpr - radius * 2,
        y: (ch / 4) * dpr,
      };
    };

    const getPropsLeft = ({ canvas, dpr }) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const radius = (Math.max(cw, ch) / 20) * dpr;
      return {
        radius,
        x: (cw / 2) * dpr + radius * 2,
        y: (ch / 4) * dpr,
      };
    };

    this.canvas = new Canvas({
      canvas: this._canvas,
      container: this._container,
      hasPointer: true,
      pauseInBackground: true,
      entities: [
        new Background(),
        new Eye({
          getProps: getPropsRight,
        }),
        new Eye({
          getProps: getPropsLeft,
        }),
      ],
    });
  }

  handleChange = (isInView) => {
    if (this.canvas.paused && !isInView) return;
    isInView ? this.canvas.start() : this.canvas.stop();
  };

  render() {
    return (
      <Observed
        onChange={this.handleChange}
        initialViewState
        intersectionRatio={0.01}
        options={OBSERVER_OPTIONS}
      >
        {({ mapRef }) => (
          <article
            className={styles.root}
            ref={(ref) => {
              this._container = ref;
              mapRef(ref);
            }}
          >
            <div className={styles.inner}>
              <p className={styles.ok}>
                <strong>OK</strong>
              </p>
              <div className={styles.container}>
                <canvas ref={(ref) => (this._canvas = ref)} />
              </div>
            </div>
          </article>
        )}
      </Observed>
    );
  }
}
