import { Canvas } from '@gush/candybar';
import { GameEvents } from './GameEvents.js';
import EventPublisher from './EventPublisher.js';
import LevelView from './LevelView.js';
import GameController from './GameController.js';
import GameInterface from './GameInterface.js';
import GameAssets from './GameAssets.js';

export default class DamnGame {
    static init(canvas) {
        const game = new DamnGame(canvas);
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

        // Event Pub/Sub
        this.eventPublisher = new EventPublisher();

        // Game Assets
        this.gameAssets = new GameAssets(this.handleAssetsLoaded);
    }

    handleAssetsLoaded = () => {
        // Game controller
        this.setState({ hasLoaded: true });
        this.gameController = new GameController();
        this.gameController.subscribe(this.eventPublisher);

        // Level view
        this.levelView = new LevelView(this.gameController, this.gameAssets);
        this.levelView.subscribe(this.eventPublisher);

        // Game Interface View
        this.gameInterface = new GameInterface(
            this.gameController,
            this.gameAssets,
        );

        this.addListeners();
    };

    setState(nextState) {
        return (this.state = Object.assign({}, this.state, nextState));
    }

    addListeners() {
        ['mousedown', 'touchstart'].forEach((event) => {
            this.canvas.addEventListener(
                event,
                this.handleInteractStart,
                false,
            );
        });

        ['mouseup', 'touchend'].forEach((event) => {
            this.canvas.addEventListener(event, this.handleInteractEnd, false);
        });

        window.addEventListener('keydown', this.handleKeydown, false);
        window.addEventListener('keyup', this.handleKeyup, false);
    }

    /*----------------------------------------------------------*\
    |* Event Handlers
    \*----------------------------------------------------------*/

    handleInteractStart = (event) => {
        event.preventDefault();
        this.eventPublisher.publish(GameEvents.MOUSE_DOWN);
    };

    handleInteractEnd = (event) => {
        this.eventPublisher.publish(GameEvents.MOUSE_UP);
    };

    handleKeydown = (event) => {
        this.eventPublisher.publish(GameEvents.MOUSE_DOWN);
    };

    handleKeyup = (event) => {
        // key events
        switch (event.keyCode) {
            // space
            case 32:
                this.eventPublisher.publish(GameEvents.MOUSE_UP);
                break;
        }
    };

    play() {
        this.setState({ isPlaying: true });
    }

    stop() {
        this.setState({ isPlaying: false });
    }

    /*----------------------------------------------------------*\
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
