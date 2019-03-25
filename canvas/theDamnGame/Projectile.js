import Box from './Box.js';

export default class Projectile extends Box {
    constructor(image, size = 5, x, y, vx, vy) {
        super();

        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.image = image;
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
        this.x += this.vx * this.dpr;
        this.y += this.vy * this.dpr;

        if (gameBounds) {
            // if it intersects with the game bounds it's not dead
            const doesIntersect = this.hitTest(gameBounds, this);
            this.dead = !doesIntersect;
        }
    }

    draw() {
        const { image, w, h } = this;
        this.ctx.fillStyle = '#667eea';
        this.ctx.drawImage(image, 0, 0, w, h);
    }
}
