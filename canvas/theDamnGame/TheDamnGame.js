import { Canvas } from '@gush/candybar';
import LevelView from './LevelView.js';
import Events from './Events';
import GameInterface from './GameInterface.js';
import GameAssets from './GameAssets.js';

const images = {
    bomb: '/static/damnit/bomb.png',
    damnit: '/static/damnit/damnit.png',
    fist: '/static/damnit/fist.png',
    hit: '/static/damnit/hit.png',
    life: '/static/damnit/life.png',
    pill: '/static/damnit/pill.png',
    pizza: '/static/damnit/pizza.png',
    shield: '/static/damnit/shield.png',
    shoot: '/static/damnit/shoot.png',
    tv: '/static/damnit/tv.png',
};

export default class TheDamnGame {
    static init(canvas) {
        const game = new TheDamnGame(canvas);

        return new Canvas({
            canvas,
            hasPointer: true,
            pauseInBackground: true,
            entities: [game],
        });
    }

    constructor(canvas) {
        this.canvas = canvas;
        this.hasLoaded = false;

        // Game Assets
        this.gameAssets = new GameAssets(images, this.handleAssetsLoaded);
    }

    handleAssetsLoaded = () => {
        // Game controller
        this.hasLoaded = true;

        // Level view
        this.levelView = new LevelView(this.gameAssets);

        // Game Interface View
        this.gameInterface = new GameInterface(this.gameAssets);

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
        this.gameInterface.draw(context);
    };
}
