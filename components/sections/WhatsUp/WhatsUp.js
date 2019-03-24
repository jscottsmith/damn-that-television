import React, { Component } from 'react';
import styles from './WhatsUp.scss';
import Observed from 'react-observed';
import { Canvas } from '@gush/candybar';
import Vision from '../../../canvas/vision/Vision';
import Background from '../../../canvas/common/Background';
import { OBSERVER_OPTIONS } from 'constants/app';
import Copy from 'components/atoms/Copy';
import content from 'markdown/whats-up.md';

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
                            <Copy className={styles.copy}>{content}</Copy>
                        </div>
                        <div className={styles.container}>
                            <canvas ref={(ref) => (this._canvas = ref)} />
                        </div>
                    </article>
                )}
            </Observed>
        );
    }
}
