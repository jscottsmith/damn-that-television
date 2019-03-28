import { Canvas } from '@gush/candybar';
import LevelView from './LevelView.js';
import Events from './Events';
import GameAssets from './GameAssets.js';

export default class TheDamnGame {
    static init({ canvas, config }) {
        const game = new TheDamnGame({ canvas, config });

        return new Canvas({
            canvas,
            hasPointer: true,
            pauseInBackground: true,
            entities: [game],
        });
    }

    constructor({ canvas, config }) {
        this.canvas = canvas;
        this.config = config;
        this.hasLoaded = false;

        // Game Assets
        this.assets = new GameAssets(config.assets, this.handleAssetsLoaded);
    }

    handleAssetsLoaded = () => {
        // Game controller
        this.hasLoaded = true;

        // Level view
        this.levelView = new LevelView({
            assets: this.assets,
            config: this.config,
        });

        this.events = new Events(this.canvas);
    };

    /* ----------------------------------------------------------*\
    |* Main Loop
    \*----------------------------------------------------------*/

    destroy = () => {};

    update = (context) => {
        if (!this.hasLoaded) return;
        this.levelView.update(context);
    };

    draw = (context) => {
        if (!this.hasLoaded) return;
        this.levelView.draw(context);
    };
}
