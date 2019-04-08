import { aabb2DIntersection } from './gameUtils';

export default class Projectile {
    constructor(image, size = 5, x, y, vx, vy) {
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
        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.dead = false;

        this.draw();
    }

    update(gameBounds) {
        this.x += this.vx * this.dpr;
        this.y += this.vy * this.dpr;
        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };

        if (gameBounds) {
            // if it intersects with the game bounds it's not dead
            const doesIntersect = aabb2DIntersection(gameBounds, this);
            this.dead = !doesIntersect;
        }
    }

    draw() {
        const { image, w, h } = this;
        // this.ctx.fillStyle = '#667eea';
        // this.ctx.strokeStyle = 'red';
        // this.ctx.lineWidth = 1;
        // this.ctx.strokeRect(0, 0, w, h);
        this.ctx.drawImage(image, 0, 0, w, h);
    }
}
