import { Entity, Point, utils } from '@gush/candybar';

const { scaleBetween, clamp, lerp } = utils;

export default class Projector extends Entity {
    constructor({ radius = 100, x, y }) {
        super();
        this.x = x;
        this.y = y;
        this.r = radius;
        this.innerR = this.r / 7;
        this.angle = 0;

        // origin
        this.center = new Point(x, y);
        // current light source position
        this.source = new Point(x, y);

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
        const h = this.toValue(ctx.canvas.height / 3);
        ctx.strokeStyle = '#ea94ba';
        ctx.lineWidth = this.r / 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + h);
        ctx.stroke();
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
        this.drawBase(ctx, bounds);
        this.drawWhites(ctx);
        this.drawPupil(ctx);
        this.drawBaseTop(ctx);
    };

    update = ({ pointer }) => {
        this.angle = this.center.angleRadians(pointer.position);
        const dist = pointer.position.distance(this.center);
        this.norm = clamp(scaleBetween(dist, 0, 1, 0, this.maxDist), 0, 1);
        const moveDist = this.norm * this.moveDist;
        const dest = this.center.clone().moveAtAngle(this.angle, moveDist);
        this.source = this.source.lerp(dest, 0.1);
    };
}
