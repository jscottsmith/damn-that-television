import { GameEvents } from './GameEvents.js';

export default class Player {
    constructor(size) {
        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.w = size;
        this.h = size;

        // global positioning
        this.x = 0;
        this.y = 0;

        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        // Initial state
        this.state = GameEvents.MOUSE_UP;

        // Draw state based on events
        this.drawState = {
            [GameEvents.MOUSE_UP]: this.drawIdle,
            [GameEvents.MOUSE_DOWN]: this.drawFiring,
            [GameEvents.PLAYER_HIT]: this.drawHit,
            [GameEvents.PLAYER_DEAD]: this.drawDead,
        };

        this.draw();
    }

    subscribe(eventPublisher) {
        eventPublisher.subscribe(GameEvents.MOUSE_DOWN, this.setState);
        eventPublisher.subscribe(GameEvents.MOUSE_UP, this.setState);
        eventPublisher.subscribe(GameEvents.PLAYER_HIT, this.handleHit);
        // eventPublisher.subscribe(GameEvents.PLAYER_DEAD, this.handleDead);
    }

    setState = nextState => {
        this.state = nextState;
        this.draw();
    };

    handleHit = nextState => {
        this.setState(nextState);
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.setState(GameEvents.MOUSE_UP);
        }, 300);
    };

    handleDead = nextState => {
        this.setState(nextState);
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.setState(GameEvents.MOUSE_UP);
        }, 3000);
    };

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    updatePosition(x, y) {
        // moves the Player toward the new x, y.
        this.x = (x - this.x) / 20 + this.x; // slows the movement down
        this.y = y;

        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;
    }

    drawRect(color) {
        const { w, h } = this;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, w, h);
    }

    drawIdle = () => {
        this.drawRect('pink');
    };

    drawFiring = () => {
        this.drawRect('tomato');
    };

    drawHit = () => {
        this.drawRect('blue');
    };

    drawDead = () => {
        this.drawRect('black');
    };

    draw() {
        const drawState = this.drawState[this.state];
        drawState();
    }
}
