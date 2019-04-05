import Shield from './Shield.js';
import gameStore from './store/gameStore.js';
import connect from './store/connect';

export default class Player {
    static states = {
        IDLE: 'IDLE',
        FIRING: 'FIRING',
        HIT: 'HIT',
        DEAD: 'DEAD',
        INVINCIBLE: 'INVINCIBLE',
    };

    constructor({ config, assets, size, x, y }) {
        // local player canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.assets = assets;
        this.config = config;

        this.w = size;
        this.h = size;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        // global positioning
        this.x = x;
        this.y = y;
        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;

        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };

        this.dead = false;
        this.shield = new Shield({
            r: size * 1.3,
            x: this.x,
            y: this.y,
        });

        // Initial state
        this.drawState = Player.states.INVINCIBLE;

        // Draw state based on events
        this.drawStates = {
            [Player.states.IDLE]: this.drawIdle,
            [Player.states.FIRING]: this.drawFiring,
            [Player.states.HIT]: this.drawHit,
            [Player.states.DEAD]: this.drawDead,
            [Player.states.INVINCIBLE]: this.drawInvincible,
        };

        this.subscribeToStore();

        this.draw();
    }

    /* ----------------------------------------------------------*\
    |* Redux Subscriptions
    \*----------------------------------------------------------*/

    subscribeToStore() {
        const selectScore = (state) => state.score;
        const selectHitPower = (state) => state.player.hitPower;

        connect(
            gameStore,
            selectHitPower,
        )(this.handleHitPowerChange);

        connect(
            gameStore,
            selectScore,
        )(this.handleScoreChange);
    }

    handleScoreChange = ({ kills }, { kills: prevKills }) => {
        if (kills > prevKills && kills >= this.config.killsToAdvance) {
        }
    };

    handleHitPowerChange = (hitPower) => {
        if (hitPower > 0) {
            this.handleHit();
        } else {
            this.handleDead();
        }
    };

    setState = (nextState) => {
        this.drawState = nextState;
        this.draw();
    };

    setHit = () => this.setState(Player.states.HIT);

    setIdle = () => this.setState(Player.states.IDLE);

    setFiring = () => this.setState(Player.states.FIRING);

    setDead = () => this.setState(Player.states.DEAD);

    setInvincible = () => this.setState(Player.states.INVINCIBLE);

    handleHit() {
        this.setHit();
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.setIdle();
        }, 300);
    }

    handleDead() {
        if (this.drawState === Player.states.DEAD) return; // so timer doesn't keep reseting if hit again

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

        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };

        if (!this.shield.dead) {
            this.bounds = this.shield.bounds;
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

    drawInvincible = () => {
        const image = this.assets.images.shoot;
        this.drawRect(image);
    };

    draw() {
        this.drawStates[this.drawState]();
    }
}
