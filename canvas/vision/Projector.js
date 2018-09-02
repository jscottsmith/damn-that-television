import { Entity, Point, utils } from '@gush/candybar';

const { scaleBetween, clamp, lerp } = utils;

export default class Projector extends Entity {
    constructor({ radius = 100, p1, p2 }) {
        super();
        this.x = p1.x;
        this.y = p1.y;
        this.r = radius;
        this.baseWidth = this.r / 2;
        this.shadowWidth = this.r * 2;
        this.innerR = this.r * 0.2;
        this.angle = 0;

        // origin
        this.center = p1.clone();
        // current light source position
        this.source = p1.clone();
        // base of projector
        this.base = p2;
        this.baseLeft = p2.clone().move(-this.baseWidth / 2, 0);
        this.baseRight = p2.clone().move(this.baseWidth / 2, 0);
        // pointer to lerp
        this.pointer = p1.clone();

        // max dist is center to a corner
        this.maxDist = this.center.distance({ x: 0, y: 0 });
        this.moveDist = this.r - this.innerR - this.r / 10;
    }

    getWhiteGradient(ctx, center = this.source, radius = this.r) {
        const rx = center.x;
        const ry = center.y;
        const gradient = ctx.createRadialGradient(rx, ry, radius, rx, ry, 0);
        gradient.addColorStop(1, 'white');
        gradient.addColorStop(0.5, '#edf8ff');
        gradient.addColorStop(0, '#dce6fa');
        return gradient;
    }

    getPinkGradient(ctx, x, y, width) {
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(1, '#f4c8db');
        gradient.addColorStop(0, '#ea94ba');
        return gradient;
    }

    drawBase(ctx) {
        ctx.strokeStyle = '#ea94ba';
        ctx.lineWidth = this.baseWidth;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.base.x, this.base.y);
        ctx.stroke();
    }

    drawBaseShadow(ctx) {
        const h = this.toValue(ctx.canvas.height);
        const x = this.center.x - this.pointer.x;
        ctx.fillStyle = '#665b85';
        ctx.beginPath();
        ctx.moveTo(this.baseLeft.x, this.baseLeft.y);
        ctx.lineTo(this.baseRight.x, this.baseRight.y);
        ctx.lineTo(this.baseRight.x + x + this.shadowWidth, h);
        ctx.lineTo(this.baseLeft.x + x - this.shadowWidth, h);
        ctx.closePath();
        ctx.fill();
    }

    drawWhites(ctx) {
        ctx.fillStyle = this.getWhiteGradient(ctx);
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    drawPupil(ctx) {
        const { x, y } = this.source;
        ctx.strokeStyle = '#665b85';
        ctx.lineWidth = this.innerR / 3;
        ctx.fillStyle = '#72dbde';
        ctx.beginPath();
        ctx.arc(x, y, this.innerR, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawBaseTop(ctx) {
        const w = this.r;
        const h = this.r / 4;
        const x2 = this.center.x - w / 2;
        const y2 = this.center.y + this.r - h * 0.55;
        ctx.fillStyle = this.getPinkGradient(ctx, x2, y2, w);
        ctx.fillRect(x2, y2, w, h);
    }

    draw = ({ ctx, bounds }) => {
        this.drawBaseShadow(ctx);
        this.drawBase(ctx);
        this.drawWhites(ctx);
        this.drawPupil(ctx);
        this.drawBaseTop(ctx);
    };

    update = ({ pointer }) => {
        const lerp = 0.05;
        this.pointer = this.pointer.lerp(pointer.position, lerp);
        this.angle = this.center.angleRadians(this.pointer);

        const dist = this.pointer.distance(this.center);

        this.norm = clamp(scaleBetween(dist, 0, 1, 0, this.maxDist), 0, 1);

        const moveDist = this.norm * this.moveDist;
        const dest = this.center.clone().moveAtAngle(this.angle, moveDist);

        this.source = this.source.lerp(dest, lerp);
    };
}
