import { aabb2DIntersection } from './gameUtils.js';

export const EnemyMovementTypes = {
    SNEK: 'SNEK', // sine movment
    FOLLOWER: 'FOLLOWER', // moves toward player
    DUNCE: 'DUNCE', // just falls
};

export const allEnemyMovements = [
    EnemyMovementTypes.DUNCE,
    EnemyMovementTypes.FOLLOWER,
    EnemyMovementTypes.SNEK,
];

export default class Enemy {
    constructor({ image, size = 40, type = EnemyMovementTypes.DUNCE, x, y }) {
        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.image = image;
        this.type = type;

        this.w = size * this.dpr;
        this.h = size * this.dpr;
        this.x = x - this.w / 2;
        this.y = y - this.h / 2;

        this.bounds = {
            w: this.w,
            h: this.h,
            x: this.x,
            y: this.y,
        };

        // for follower types
        this.vx = 0;
        this.vy = 0;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.dead = false;

        this.sine = 1;
        this.speed = 5;

        this.updateMap = {
            [EnemyMovementTypes.SNEK]: this.updateSnek,
            [EnemyMovementTypes.FOLLOWER]: this.updateFollower,
            [EnemyMovementTypes.DUNCE]: this.updateDunce,
        };

        this.draw();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.bounds.x = x;
        this.bounds.y = y;
    }

    updateSnek = () => {
        this.sine += 0.1;
        const y = this.y + this.speed;
        const x = this.x + Math.sin(this.sine) * this.speed;
        this.setPosition(x, y);
    };

    updateFollower = (player) => {
        if (player) {
            // as it moves closer to the player on the y axis,
            // the more it moves horizontally. Should also
            // require some clamping to limit the speed
            this.vx = (player.x - this.x) / ((player.y - this.y) * 0.25);
        }

        const x = this.x + this.vx * this.dpr;
        const y = this.y + this.speed * this.dpr;
        this.setPosition(x, y);
    };

    updateDunce = () => {
        this.speed += 0.05;
        const x = this.x;
        const y = this.y + this.speed;
        this.setPosition(x, y);
    };

    update(gameBounds, player) {
        // call update method based on type
        const updateEnemy = this.updateMap[this.type];
        updateEnemy(player);

        if (gameBounds) {
            // if it intersects with the game bounds it's not dead
            const doesIntersect = aabb2DIntersection(gameBounds, this);
            this.dead = !doesIntersect;
        }
    }

    draw() {
        const { image, w, h } = this;
        this.ctx.drawImage(image, 0, 0, w, h);
        // this.ctx.strokeStyle = 'red';
        // this.ctx.lineWidth = 1;
        // this.ctx.strokeRect(0, 0, w, h);
    }
}
