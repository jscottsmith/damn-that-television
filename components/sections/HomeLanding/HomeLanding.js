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

        const getPositionRight = ({ canvas, dpr }) => {
            const cw = canvas.clientWidth;
            const ch = canvas.clientHeight;
            const mw = Math.min(cw, ch);
            const w = (mw / 40) * dpr;
            const h = window.innerHeight * 0.4 * dpr;
            const x = cw * 0.25 * dpr;
            const y = ch * 0.65 * dpr;
            return { x, y, w, h };
        };

        const getPositionLeft = ({ canvas, dpr }) => {
            const cw = canvas.clientWidth;
            const ch = canvas.clientHeight;
            const mw = Math.min(cw, ch);
            const w = (mw / 30) * dpr;
            const h = window.innerHeight * 0.5 * dpr;
            const x = cw * 0.75 * dpr;
            const y = ch * 0.85 * dpr;
            return { x, y, w, h };
        };

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
                    isLeft: false,
                    getPosition: getPositionRight,
                }),
                new WavingArm({
                    ...armOptions,
                    isLeft: true,
                    getPosition: getPositionLeft,
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
