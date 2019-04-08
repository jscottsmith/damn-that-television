import { getRandomInt } from './gameUtils.js';

export default class Explosion {
    constructor({ power, x, y, dpr }) {
        this.x = x;
        this.y = y;
        this.power = power; // should be from 1 - 0
        this.r1 = 1 * dpr;
        this.pi = Math.PI;
        this.pi2 = this.pi * 2;
        this.dead = false;
        this.multiplier = getRandomInt(15, 25) * dpr;
    }

    update() {
        this.r1 += this.power * this.multiplier;
        this.power *= 0.93;

        if (this.power < 0.01) {
            this.dead = true;
        }
    }

    draw({ ctx, dpr }) {
        ctx.globalAlpha = this.power;
        ctx.strokeStyle = '#f7e7b3';
        ctx.lineWidth = this.multiplier * this.power * dpr * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r1, 0, this.pi2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}
