import React, { PureComponent } from 'react';
import Starter from './paper/Starter';

export default class Paper extends PureComponent {
    componentDidMount() {
        this.setupPaperCanvas();
    }

    componentWillUnmount() {
        this.paper.teardown();
    }

    setupPaperCanvas() {
        const canvas = this.refs.paperCanvas;
        // add resize attribute
        canvas.setAttribute('resize', 'true');

        this.paper = new Starter(canvas);
        this.paper.init();
    }

    render() {
        return (
            <canvas ref="paperCanvas" id="paper-canvas" />
        );
    }
}
