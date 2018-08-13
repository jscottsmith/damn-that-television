import React, { Component } from 'react';
import styles from './SeeMe.scss';
import Observed from 'react-observed';

import { Canvas } from '@gush/candybar';

import Eye from '../../../canvas/eyes/Eye';
import Background from '../../../canvas/waving-arm/Background';

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export default class SeeMe extends Component {
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
