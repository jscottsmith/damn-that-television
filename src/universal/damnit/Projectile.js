import Box from './Box.js';

export default class Projectile extends Box {
    constructor(size = 5, x, y, vx, vy) {
        super();

        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.w = size * this.dpr;
        this.h = size * this.dpr;
        this.x = x - this.w / 2;
        this.y = y - this.h / 2;
        this.vx = vx;
        this.vy = vy;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.dead = false;

        this.draw();
    }

    update(gameBounds) {
        this.x += this.vx;
        this.y += this.vy;

        if (gameBounds) {
            // if it intersects with the game bounds it's not dead
            const doesIntersect = this.hitTest(gameBounds, this);
            this.dead = !doesIntersect;
        }
    }

    draw() {
        const { w, h } = this;
        this.ctx.fillStyle = '#667eea';
        this.ctx.fillRect(0, 0, w, h);
    }
}
