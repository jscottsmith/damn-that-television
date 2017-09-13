import { GameEvents } from './GameEvents.js';
import EventPublisher from './EventPublisher.js';
import LevelView from './LevelView.js';
import GameController from './GameController.js';
import GameInterface from './GameInterface.js';
import GameAssets from './GameAssets.js';

export default class DamnGame {
    static init(canvas) {
        return new DamnGame(canvas);
    }

    constructor(canvas) {
        this.dpr = window.devicePixelRatio;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);

        this.state = {
            isPlaying: false,
        };

        // Event Pub/Sub
        this.eventPublisher = new EventPublisher();

        // Game Assets
        this.gameAssets = new GameAssets(this.handleAssetsLoaded);
    }

    handleAssetsLoaded = () => {
        // Game controller
        this.gameController = new GameController();
        this.gameController.subscribe(this.eventPublisher);

        // Level view
        this.levelView = new LevelView(
            this.canvas,
            this.ctx,
            this.gameController,
            this.gameAssets
        );
        this.levelView.subscribe(this.eventPublisher);

        // Game Interface View
        this.gameInterface = new GameInterface(
            this.canvas,
            this.ctx,
            this.gameController,
            this.gameAssets
        );

        this.addListeners();
        this.setupCanvas();
        this.run();
    };

    setState(nextState) {
        return (this.state = Object.assign({}, this.state, nextState));
    }

    addListeners() {
        window.addEventListener('resize', this.setupCanvas, false);

        ['mousedown', 'touchstart'].forEach(event => {
            this.canvas.addEventListener(
                event,
                this.handleInteractStart,
                false
            );
        });

        ['mousemove', 'touchmove'].forEach((event, touch) => {
            this.canvas.addEventListener(event, this.handleInteractMove, false);
        });

        ['mouseup', 'touchend'].forEach(event => {
            this.canvas.addEventListener(event, this.handleInteractEnd, false);
        });

        window.addEventListener('keydown', this.handleKeydown, false);
        window.addEventListener('keyup', this.handleKeyup, false);
    }

    /*----------------------------------------------------------*\
    |* Event Handlers
    \*----------------------------------------------------------*/

    setupCanvas = () => {
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;

        const { width: w, height: h } = this.canvas;
        this.gameBounds = { x: 0, y: 0, w, h };
    };

    handleInteractStart = event => {
        event.preventDefault();
        this.eventPublisher.publish(GameEvents.MOUSE_DOWN);
    };

    handleInteractMove = event => {
        let x = 0;
        let y = 0;

        if (event.targetTouches) {
            event.preventDefault();
            x = event.targetTouches[0].clientX * this.dpr;
            y = event.targetTouches[0].clientY * this.dpr;
        } else {
            x = event.clientX * this.dpr;
            y = event.clientY * this.dpr;
        }

        this.eventPublisher.publish(GameEvents.MOUSE_MOVE, { x, y });
    };

    handleInteractEnd = event => {
        this.eventPublisher.publish(GameEvents.MOUSE_UP);
    };

    handleKeydown = event => {
        this.eventPublisher.publish(GameEvents.MOUSE_DOWN);
    };

    handleKeyup = event => {
        // key events
        switch (event.keyCode) {
            // space
            case 32:
                this.eventPublisher.publish(GameEvents.MOUSE_UP);
                break;
        }
    };

    start() {
        this.setState({ isPlaying: true });
    }

    /*----------------------------------------------------------*\
    |* Main Loop
    \*----------------------------------------------------------*/

    run = () => {
        if (this.state.isPlaying) {
            this.levelView.run();
            this.gameInterface.run();
        }

        window.requestAnimationFrame(this.run);
    };
}
