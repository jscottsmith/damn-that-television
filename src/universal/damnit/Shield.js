import Circle from './Circle.js';
import { GameEvents } from './GameEvents.js';

export default class Shield extends Circle {
    constructor(r) {
        super();
        this.dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.r = r;
        this.w = r * 2;
        this.h = r * 2;

        // global coordinates. Not local coord to draw from
        this.x = 0;
        this.y = 0;
        this.cx = r;
        this.cy = r;

        this.pi2 = Math.PI * 2;
        this.opacity = 0.3;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.dead = false;

        this.draw();
    }

    subscribe(eventPublisher) {
        eventPublisher.subscribe(GameEvents.SHIELD_HIT, this.handleHit);
        eventPublisher.subscribe(GameEvents.SHIELD_DOWN, this.handleShieldDown);
    }

    handleHit() {}

    handleShieldDown = () => {
        this.dead = true;
        this.draw();
    };

    shieldTimeout() {
        setTimeout(() => {
            this.shield = false;
        }, 300);
    }

    updatePosition(cx, cy) {
        this.x = cx - this.r;
        this.y = cy - this.r;
        this.cx = cx;
        this.cy = cy;
    }

    drawCircle(color, r) {
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(r, r, r, 0, this.pi2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }

    draw() {
        if (this.dead) {
            this.ctx.clearRect(0, 0, this.w, this.h);
        } else {
            this.drawCircle('skyblue', this.r);
        }
    }
}
