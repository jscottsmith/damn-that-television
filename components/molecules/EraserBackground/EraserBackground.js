import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './EraserBackground.scss';
import { Canvas } from '@gush/candybar';
import Eraser from '../../../canvas/eraser/Eraser';

export default class HomeLanding extends PureComponent {
    componentDidMount() {
        this.runIt();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isPaused !== this.props.isPaused) {
            if (this.props.isPaused) {
                this.canvas.stop();
            } else {
                this.canvas.start();
            }
        }
    };

    runIt() {
        const DPR = window.devicePixelRatio || 1;

        const setupCanvas = () => {};

        this.canvas = new Canvas({
            canvas: this._canvas,
            container: this._container,
            hasPointer: true,
            pauseInBackground: true,
            entities: [new Eraser({ setupCanvas })],
        });
    }

    render() {
        return (
            <div
                className={cx(styles.container, {
                    [styles.isPaused]: this.props.isPaused,
                })}
            >
                <canvas ref={(ref) => (this._canvas = ref)} />
            </div>
        );
    }
}
