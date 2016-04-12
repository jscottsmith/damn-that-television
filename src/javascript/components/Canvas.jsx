import React from 'react';
import Diamonds from './paper/Diamonds';

export default class Paper extends React.Component {
    componentDidMount() {
        this.setupPaperCanvas();
    }

    setupPaperCanvas() {
        const canvas = this.refs.paperCanvas;
        // add resize attribute
        canvas.setAttribute('resize', 'true');
        canvas.setAttribute('hidpi', 'true');

        const diamonds = new Diamonds(canvas);
        diamonds.init();
    }

    render() {
        return (
            <canvas ref="paperCanvas" id="paper-canvas" />
        );
    }
}
