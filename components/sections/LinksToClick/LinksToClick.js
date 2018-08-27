import React, { Component } from 'react';
import styles from './LinksToClick.scss';
import Observed from 'react-observed';
import { Canvas } from '@gush/candybar';
import { observerOptions } from '../../constants/app';
import content from 'markdown/links.md';
import Copy from 'components/atoms/Copy';

import LetterDrop from '../../../canvas/letters/LetterDrop';
import Background from '../../../canvas/common/Background';

export default class LinksToClick extends Component {
    componentDidMount() {
        this.runIt();
    }

    runIt() {
        this.letterDrop = new LetterDrop();
        this.canvas = new Canvas({
            canvas: this._canvas,
            container: this._container,
            // hasPointer: true,
            pauseInBackground: true,
            entities: [new Background(), this.letterDrop],
        });
    }

    handleChange = (isInView) => {
        if (this.canvas.paused && !isInView) return;
        isInView ? this.canvas.start() : this.canvas.stop();
    };

    queueWord = (word) => () => {
        this.letterDrop.queueWord(word);
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
                        <div className={styles.container}>
                            <canvas ref={(ref) => (this._canvas = ref)} />
                        </div>
                        <div className={styles.inner}>
                            <div className={styles.copy}>
                                <Copy>{content}</Copy>
                                <div className={styles.links}>
                                    <button
                                        className={styles.button}
                                        onMouseEnter={this.queueWord('fooo')}
                                    >
                                        Foo!
                                    </button>
                                    <button
                                        className={styles.button}
                                        onMouseEnter={this.queueWord('barbs')}
                                    >
                                        Bar!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                )}
            </Observed>
        );
    }
}
