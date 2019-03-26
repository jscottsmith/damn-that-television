import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './EraserBackground.scss';
import { Canvas } from '@gush/candybar';
import Eraser from '../../../canvas/eraser/Eraser';

export default class HomeLanding extends PureComponent {
    static propTypes = {
        isPaused: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        const setupCanvas = () => {};

        this.canvas = new Canvas({
            canvas: this._canvas,
            container: this._container,
            hasPointer: true,
            pauseInBackground: true,
            entities: [new Eraser({ setupCanvas })],
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isPaused !== this.props.isPaused) {
            if (this.props.isPaused) {
                this.canvas.stop();
            } else {
                this.canvas.start();
            }
        }
    }

    componentWillUnmount() {
        this.canvas.destroy();
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
