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
        // const DPR = window.devicePixelRatio || 1;
        // const mw = Math.max(window.innerWidth, window.innerHeight);
        // const w1 = (mw / 60) * DPR;
        // const w2 = (mw / 40) * DPR;
        // const h1 = window.innerHeight * 0.4 * DPR;
        // const h2 = window.innerHeight * 0.5 * DPR;
        // const x1 = this._container.clientWidth * 0.25 * DPR;
        // const y1 = this._container.clientHeight * 0.65 * DPR;
        // const x2 = this._container.clientWidth * 0.75 * DPR;
        // const y2 = this._container.clientHeight * 0.85 * DPR;
        // const armOptions = {
        //     holeColor: color.purple,
        //     color: color.pink,
        //     force: new Point(-0.02, -0.2 * DPR),
        // };

        const DPR = window.devicePixelRatio || 1;
        const radius = (window.innerWidth / 20) * DPR;

        this.canvas = new Canvas({
            canvas: this._canvas,
            container: this._container,
            hasPointer: true,
            entities: [
                new Background(),
                new Eye({
                    radius,
                    x: (window.innerWidth / 2) * DPR - radius * 2,
                    y: (window.innerHeight / 4) * DPR,
                }),
                new Eye({
                    radius,
                    x: (window.innerWidth / 2) * DPR + radius * 2,
                    y: (window.innerHeight / 4) * DPR,
                }),
            ],
        });
    }

    handleChange = (isInView) => {
        isInView ? this.canvas.start() : this.canvas.stop();
    };

    render() {
        return (
            <Observed
                onChange={this.handleChange}
                initialViewState={true}
                intersectionRatio={0}
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
