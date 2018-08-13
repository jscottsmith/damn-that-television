import { Entity, Point, Bounds, Segment, utils } from '@gush/candybar';
import getSightPolygon from './src/rays';
import Projector from './Projector';
import createBoundsFromSegments from './createBoundsFromSegments';

const { getRandomFloat, getRandomInt } = utils;

export default class Shape extends Entity {
    static types = {
        ZIGZAG: 'ZIGZAG',
        TRIANGLE: 'TRIANGLE',
        RING: 'RING',
    };

    constructor(config) {
        super();
        this.type = config.type;
        this.x = this.toValue(config.x);
        this.y = this.toValue(config.y);
        this.vx = this.toValue(config.vx);
        this.vy = this.toValue(config.vy);
        this.color = config.color;
        this.segments = [];
        this.bounds = null;
        this.createShapes();
    }

    createShapes() {
        switch (this.type) {
            case this.constructor.types.ZIGZAG: {
                return this.createZigZag();
            }
            case this.constructor.types.TRIANGLE: {
                return this.createTriangle();
            }
            case this.constructor.types.RING: {
                return this.createRing();
            }
        }
    }

    moveTo(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        this.x = x;
        this.y = y;
        this.segments.forEach((seg) => seg.move(dx, dy));
        this.bounds.moveTo(x, y);
    }

    updateBoundsFromSegments() {
        this.bounds = createBoundsFromSegments(this.segments);
        // update the initial position since it's not the top/left
        this.x = this.bounds.x;
        this.y = this.bounds.y;
    }

    createRing() {
        const pi = Math.PI;
        const turns = 6;
        const rad = (2 * pi) / turns;
        const dist = this.toValue(getRandomFloat(5, 30));
        const start = new Point(this.x, this.y);
        let i = 0;
        while (i < turns) {
            const angle = rad * i;
            const prevPoint = i === 0 ? start : this.segments[i - 1].p2;
            const nextPoint = prevPoint.clone().moveAtAngle(angle, dist);
            const segment = new Segment(
                new Point(prevPoint.x, prevPoint.y),
                new Point(nextPoint.x, nextPoint.y),
            );
            segment.entered = false;
            this.segments.push(segment);
            ++i;
        }

        this.updateBoundsFromSegments();
    }

    createTriangle() {
        const pi = Math.PI;
        const turns = 3; // getRandomInt(2, 7);
        const sa = getRandomFloat(-pi, pi); // start angle
        const rad = (pi * 2) / 3; // 60deg
        const dist = this.toValue(getRandomFloat(10, 40));
        const start = new Point(this.x, this.y);
        let i = 0;
        while (i < turns) {
            const angle = rad * i + sa;
            const prevPoint = i === 0 ? start : this.segments[i - 1].p2;
            const nextPoint = prevPoint.clone().moveAtAngle(angle, dist);
            const segment = new Segment(
                new Point(prevPoint.x, prevPoint.y),
                new Point(nextPoint.x, nextPoint.y),
            );
            segment.entered = false;
            this.segments.push(segment);
            ++i;
        }
        this.updateBoundsFromSegments();
    }

    createZigZag() {
        const pi = Math.PI;
        const turns = getRandomInt(2, 7);
        const sa = getRandomFloat(-pi, pi);
        const ta = getRandomFloat(pi / 6, pi / 4);
        const dist = this.toValue(getRandomFloat(20, 30));

        const start = new Point(this.x, this.y);

        let i = 0;
        while (i < turns) {
            const even = i % 2 === 0;
            const angle = even ? sa - ta : sa + ta; // alternate
            const prevPoint = i === 0 ? start : this.segments[i - 1].p2;
            const nextPoint = prevPoint.clone().moveAtAngle(angle, dist);
            const segment = new Segment(
                new Point(prevPoint.x, prevPoint.y),
                new Point(nextPoint.x, nextPoint.y),
            );
            segment.entered = false;
            this.segments.push(segment);
            ++i;
        }

        this.updateBoundsFromSegments();
    }

    drawZigZag(ctx) {
        ctx.beginPath();
        this.segments.forEach((seg, i) => {
            if (i === 0) {
                ctx.moveTo(...seg.p1.position);
                ctx.lineTo(...seg.p2.position);
            } else {
                ctx.lineTo(...seg.p2.position);
            }
        });
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.toValue(5);
        ctx.stroke();
    }

    drawPoly(ctx) {
        ctx.beginPath();
        this.segments.forEach((seg, i) => {
            if (i === 0) {
                ctx.moveTo(...seg.p1.position);
                ctx.lineTo(...seg.p2.position);
            } else {
                ctx.lineTo(...seg.p2.position);
            }
        });
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    drawRing(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.toValue(6);
        ctx.beginPath();
        ctx.arc(
            this.bounds.center.x,
            this.bounds.center.y,
            this.bounds.hw,
            0,
            2 * Math.PI,
            false,
        );
        ctx.closePath();
        ctx.stroke();
    }

    drawBounds(ctx) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(...this.bounds.params);
    }

    draw = ({ ctx }) => {
        // this.drawBounds(ctx);

        switch (this.type) {
            case this.constructor.types.ZIGZAG: {
                return this.drawZigZag(ctx);
            }
            case this.constructor.types.TRIANGLE: {
                return this.drawPoly(ctx);
            }
            case this.constructor.types.RING: {
                return this.drawRing(ctx);
            }
        }
    };

    update = (context) => {
        this.bounds.move(this.vx, this.vy);
        this.segments.forEach((seg) => {
            seg.move(this.vx, this.vy);
        });
    };
}
