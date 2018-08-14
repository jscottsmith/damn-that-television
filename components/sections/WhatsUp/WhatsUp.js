import React, { Component } from 'react';
import styles from './WhatsUp.scss';
import Observed from 'react-observed';
import { Canvas } from '@gush/candybar';
import Vision from '../../../canvas/vision/Vision';
import Background from '../../../canvas/waving-arm/Background';
import { observerOptions } from '../../constants/app';

export default class WhatsUp extends Component {
    componentDidMount() {
        this.runIt();
    }

    runIt() {
        const DPR = window.devicePixelRatio || 1;
        const radius = (window.innerWidth / 20) * DPR;

        this.canvas = new Canvas({
            canvas: this._canvas,
            container: this._container,
            hasPointer: true,
            pauseInBackground: true,
            entities: [
                new Background(),
                new Vision({
                    getSize({ canvas }) {
                        const cw = canvas.clientWidth;
                        const ch = canvas.clientHeight;
                        return { width: cw, height: ch };
                    },
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
                initialViewState={true}
                intersectionRatio={0.01}
                options={observerOptions}
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
