import Shield from './Shield.js';
import GameStore from './store/GameStore.js';
import connect from './store/connect';

export const playerStates = {
    IDLE: 'IDLE',
    FIRING: 'FIRING',
    HIT: 'HIT',
    DEAD: 'DEAD',
};

export default class Player {
    constructor(assets, size, x, y) {
        // local player canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.assets = assets;

        this.w = size;
        this.h = size;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        // global positioning
        this.x = x;
        this.y = y;
        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;

        this.dead = false;
        this.shield = new Shield(size * 1.3);

        // Initial state
        this.drawState = playerStates.IDLE;

        // Draw state based on events
        this.drawStates = {
            [playerStates.IDLE]: this.drawIdle,
            [playerStates.FIRING]: this.drawFiring,
            [playerStates.HIT]: this.drawHit,
            [playerStates.DEAD]: this.drawDead,
        };

        const selectHitPower = (state) => state.player.hitPower;

        connect(
            GameStore,
            selectHitPower,
        )(this.handleHitPowerChange);

        this.draw();
    }

    setState = (nextState) => {
        this.drawState = nextState;
        this.draw();
    };

    setHit = () => this.setState(playerStates.HIT);

    setIdle = () => this.setState(playerStates.IDLE);

    setFiring = () => this.setState(playerStates.FIRING);

    setDead = () => this.setState(playerStates.DEAD);

    handleHitPowerChange = (hitPower) => {
        if (hitPower > 0) {
            this.handleHit();
        } else {
            this.handleDead();
        }
    };

    handleHit() {
        this.setHit();
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.setIdle();
        }, 300);
    }

    handleDead() {
        if (this.drawState === playerStates.DEAD) return; // so timer doesn't keep reseting if hit again

        this.clearTimer();
        this.setDead();

        this.timer = setTimeout(() => {
            this.dead = true;
        }, 100);
    }

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
        const drawState = this.drawStates[this.drawState];
        drawState();
    }
}
