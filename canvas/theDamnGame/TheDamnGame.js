import { Canvas } from '@gush/candybar';
import LevelView from './LevelView.js';
import Events from './Events';
import GameInterface from './GameInterface.js';
import GameAssets from './GameAssets.js';

export default class TheDamnGame {
    static init(canvas) {
        const game = new TheDamnGame(canvas);
        new Canvas({
            canvas,
            hasPointer: true,
            pauseInBackground: true,
            entities: [game],
        });
        return game;
    }

    constructor(canvas) {
        this.canvas = canvas;
        this.state = {
            isPlaying: false,
            hasLoaded: false,
        };

        // Game Assets
        this.gameAssets = new GameAssets(this.handleAssetsLoaded);
    }

    handleAssetsLoaded = () => {
        // Game controller
        this.setState({ hasLoaded: true });

        // Level view
        this.levelView = new LevelView(this.gameAssets);

        // Game Interface View
        this.gameInterface = new GameInterface(this.gameAssets);

        this.events = new Events(this.canvas);
    };

    setState(nextState) {
        return (this.state = Object.assign({}, this.state, nextState));
    }

    play() {
        this.setState({ isPlaying: true });
    }

    stop() {
        this.setState({ isPlaying: false });
    }

    /* ----------------------------------------------------------*\
    |* Main Loop
    \*----------------------------------------------------------*/

    update = (context) => {
        if (!this.state.hasLoaded) return;

        if (this.state.isPlaying) {
            this.levelView.update(context);
        }
    };

    draw = (context) => {
        if (!this.state.hasLoaded) return;

        if (this.state.isPlaying) {
            this.levelView.draw(context);
            this.gameInterface.draw(context);
        }
    };
}
