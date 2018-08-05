import React, { PureComponent } from 'react';
import Observed from 'react-observed';

// import cx from 'classnames';
import styles from './HomeLanding.scss';
import Copy from 'components/atoms/Copy';
import content from 'markdown/home.md';

import { Canvas, Point } from '@gush/candybar';

import WavingArm from '../../../canvas/waving-arm/WavingArm';
import Background from '../../../canvas/waving-arm/Background';

const color = {
    pink: '#EA94BA',
    teal: '#72dbde',
    blue: '#6574ff',
    purple: '#665b85',
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export default class HomeLanding extends PureComponent {
    componentDidMount() {
        this.runIt();
    }

    runIt() {
        const DPR = window.devicePixelRatio || 1;
        const mw = Math.max(window.innerWidth, window.innerHeight);
        const w1 = (mw / 60) * DPR;
        const w2 = (mw / 40) * DPR;
        const h1 = window.innerHeight * 0.4 * DPR;
        const h2 = window.innerHeight * 0.5 * DPR;
        const x1 = this._container.clientWidth * 0.25 * DPR;
        const y1 = this._container.clientHeight * 0.65 * DPR;
        const x2 = this._container.clientWidth * 0.75 * DPR;
        const y2 = this._container.clientHeight * 0.85 * DPR;

        const armOptions = {
            holeColor: color.purple,
            color: color.pink,
            force: new Point(-0.02, -0.2 * DPR),
        };

        this.canvas = new Canvas({
            canvas: this._canvas,
            container: this._container,
            hasPointer: true,
            entities: [
                new Background(),
                new WavingArm({
                    ...armOptions,
                    width: w1,
                    height: h1,
                    position: new Point(x1, y1),
                    isLeft: false,
                }),
                new WavingArm({
                    ...armOptions,
                    width: w2,
                    height: h2,
                    position: new Point(x2, y2),
                    isLeft: true,
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
                intersectionRatio={0.01}
                options={observerOptions}
            >
                {({ isInView, mapRef }) => (
                    <article
                        className={styles.index}
                        ref={(ref) => {
                            this._container = ref;
                            mapRef(ref);
                        }}
                    >
                        <div className={styles.inner}>
                            <div className={styles.container}>
                                <canvas ref={(ref) => (this._canvas = ref)} />
                            </div>
                            <Copy className={styles.copy}>{content}</Copy>
                        </div>
                    </article>
                )}
            </Observed>
        );
    }
}
