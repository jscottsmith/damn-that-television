import Box from './Box.js';

export const EnemyTypes = {
    SNEK: 'SNEK', // sine movment
    FOLLOWER: 'FOLLOWER', // moves toward player
    DUNCE: 'DUNCE', // just falls
};

export const allEnemies = [
    EnemyTypes.DUNCE,
    EnemyTypes.FOLLOWER,
    EnemyTypes.SNEK,
];

export default class Enemy extends Box {
    constructor(size = 40, type = EnemyTypes.DUNCE, x, y) {
        super();

        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.type = type;

        this.w = size * this.dpr;
        this.h = size * this.dpr;
        this.x = x - this.w / 2;
        this.y = y - this.h / 2;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.dead = false;

        this.sine = 1;
        this.speed = 5;

        this.updateMap = {
            [EnemyTypes.SNEK]: this.updateSnek,
            [EnemyTypes.FOLLOWER]: this.updateFollower,
            [EnemyTypes.DUNCE]: this.updateDunce,
        };

        this.draw();
    }

    updateSnek = () => {
        this.sine += 0.1;
        this.y += this.speed;
        this.x += Math.sin(this.sine) * this.speed;
    };

    updateFollower = player => {
        // as it moves closer to the player on the y axis,
        // the more it moves horizontally. Should also
        // require some clamping to limit the speed
        const vx = (player.x - this.x) / ((player.y - this.y) * 0.25);
        this.x += vx;
        this.y += this.speed;
    };

    updateDunce = () => {
        this.speed += 0.05;
        this.y += this.speed;
    };

    update(gameBounds, player) {
        // call update method based on type
        const updateEnemy = this.updateMap[this.type];
        updateEnemy(player);

        if (gameBounds) {
            // if it intersects with the game bounds it's not dead
            const doesIntersect = this.hitTest(gameBounds, this);
            this.dead = !doesIntersect;
        }
    }

    draw() {
        const { w, h } = this;
        this.ctx.fillStyle = 'hotpink';
        this.ctx.fillRect(0, 0, w, h);
    }
}
