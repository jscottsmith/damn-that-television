import { getRandomInt } from './gameUtils.js';

export default class Eplosion {
    constructor(power, x, y) {
        this.dpr = window.devicePixelRatio || 1;
        this.x = x;
        this.y = y;
        this.power = power; // should be from 1 - 0
        this.r1 = 1 * this.dpr;
        // this.r2 = 1;
        // this.r3 = 1;
        this.pi = Math.PI;
        this.pi2 = this.pi * 2;
        this.dead = false;
        this.multiplier = getRandomInt(15, 25) * this.dpr;
    }

    update() {
        this.r1 += this.power * this.multiplier;
        // this.r2 *= this.power * this.multiplier * 0.1;
        // this.r3 *= this.power * this.multiplier * 0.2;
        this.power *= 0.95;

        if (this.power < 0.01) {
            this.dead = true;
        }
    }

    drawShockWave(ctx, color, r) {
        ctx.globalAlpha = this.power;
        ctx.strokeStyle = color;
        ctx.lineWidth = this.multiplier * this.power * this.dpr * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, this.pi2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    draw(ctx) {
        this.drawShockWave(ctx, '#5a41bb', this.r1);
        // this.drawShockWave(ctx, 'black', this.r2);
        // this.drawShockWave(ctx, 'black', this.r3);
    }
}
