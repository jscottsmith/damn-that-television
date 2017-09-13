import { GameEvents } from './GameEvents.js';
import Shield from './Shield.js';

export default class Player {
    constructor(assets, size, x, y) {
        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.assets = assets;

        this.w = size;
        this.h = size;

        // global positioning
        this.x = x;
        this.y = y;

        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        // Initial state
        this.state = GameEvents.MOUSE_UP;

        this.dead = false;
        this.shield = new Shield(size);

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
        this.shield.subscribe(eventPublisher);

        eventPublisher.subscribe(GameEvents.MOUSE_DOWN, this.setState);
        eventPublisher.subscribe(GameEvents.MOUSE_UP, this.setState);
        eventPublisher.subscribe(GameEvents.PLAYER_HIT, this.handleHit);
        eventPublisher.subscribe(GameEvents.PLAYER_DEAD, this.handleDead);
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
        if (this.state === nextState) return; // so timer doesn't keep reseting if hit again

        this.clearTimer();
        this.setState(nextState);

        this.timer = setTimeout(() => {
            this.dead = true;
        }, 100);
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

        if (this.shield) {
            this.shield.updatePosition(this.cx, this.cy);
        }
    }

    drawRect(image) {
        const { w, h } = this;
        this.ctx.clearRect(0, 0, w, h);
        this.ctx.drawImage(image, 0, 0, w, h);
    }

    drawIdle = () => {
        const image = this.assets.images.life;
        this.drawRect(image);
    };

    drawFiring = () => {
        const image = this.assets.images.shoot;
        this.drawRect(image);
    };

    drawHit = () => {
        const image = this.assets.images.hit;
        this.drawRect(image);
    };

    drawDead = () => {
        const image = this.assets.images.damnit;
        this.drawRect(image);
    };

    draw() {
        const drawState = this.drawState[this.state];
        drawState();
    }
}
