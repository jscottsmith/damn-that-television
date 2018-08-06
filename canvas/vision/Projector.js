import { Entity, Point, utils } from '@gush/candybar';

const { scaleBetween, clamp, lerp } = utils;

export default class Projector extends Entity {
    constructor({ width = 100, x, y }) {
        super();
        this.x = x;
        this.y = y;
        this.r = width;
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

    getGradient(ctx, center = this.source, radius = this.r) {
        const rx = center.x;
        const ry = center.y;
        const gradient = ctx.createRadialGradient(rx, ry, radius, rx, ry, 0);
        gradient.addColorStop(1, 'white');
        gradient.addColorStop(0.5, '#edf8ff');
        gradient.addColorStop(0, '#dce6fa');
        return gradient;
    }

    draw = ({ ctx }) => {
        ctx.fillStyle = 'red';
        const { x, y } = this.source;
        ctx.fillRect(x - 5, y - 5, 10, 10);
        ctx.beginPath();
        ctx.moveTo(...this.center.position);
        ctx.lineTo(...this.source.position);
        ctx.stroke();

        ctx.fillStyle = this.getGradient(ctx);
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#665b85';
        ctx.lineWidth = this.innerR / 3;
        ctx.fillStyle = '#72dbde';
        ctx.beginPath();
        ctx.arc(x, y, this.innerR, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
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
