import { Entity, Point, Bounds, Segment, utils } from '@gush/candybar';
import getSightPolygon from './src/rays';
import Projector from './Projector';

const { getRandomFloat, getRandomInt } = utils;

export default class Shape extends Entity {
    static types = {
        ZIGZAG: 'ZIGZAG',
        RECT: 'RECT',
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
        switch (this.type) {
            case this.constructor.types.ZIGZAG: {
                this.createZigZag();
            }
        }
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
            this.segments.push(
                new Segment(
                    new Point(prevPoint.x, prevPoint.y),
                    new Point(nextPoint.x, nextPoint.y),
                ),
            );
            ++i;
        }
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

    draw = ({ ctx }) => {
        switch (this.type) {
            case this.constructor.types.ZIGZAG: {
                this.drawZigZag(ctx);
            }
        }
    };

    update = (context) => {
        this.segments.forEach((seg) => {
            seg.move(this.vx, this.vy);
            if (!context.bounds.intersectsWith(seg.bounds)) {
                seg.dead = true;
            }
        });

        this.segments = this.segments.filter(({ dead }) => !dead);
        if (this.segments.length === 0) {
            this.dead = true;
        }
    };
}
