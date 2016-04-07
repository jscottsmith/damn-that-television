import React from 'react';
import Starter from './paper/Starter';

export default class Paper extends React.Component {
    componentDidMount() {
        this.setupPaperCanvas();
    }

    setupPaperCanvas() {
        const canvas = this.refs.paperCanvas;
        // add resize attribute
        canvas.setAttribute('resize', 'true');

        const starter = new Starter(canvas);
        starter.init();
    }

    render() {
        return (
            <canvas ref="paperCanvas" id="paper-canvas" />
        );
    }
}
