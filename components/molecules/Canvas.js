import React, { PureComponent } from 'react';
import { Canvas, Point } from '@gush/candybar';
import Observed from 'react-observed';

const OBSERVER_OPTIONS = {
    root: null,
    rootMargin: '0px',
    threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export default class HomeLanding extends PureComponent {
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
                options={OBSERVER_OPTIONS}
            >
                {({ isInView, mapRef }) => (
                    <canvas ref={(ref) => (this._canvas = ref)} />
                )}
            </Observed>
        );
    }
}
