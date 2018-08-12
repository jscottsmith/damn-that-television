import { Entity, Bounds, utils } from '@gush/candybar';
import getSightPolygon from './src/rays';
import Projector from './Projector';
import Shape from './Shape';
import SceneBounds from './SceneBounds';
import pointGenerator from './pointGenerator';

export default class Vision extends Entity {
    constructor(config) {
        super();
        this.getSize = config.getSize;
    }

    setupScene(context) {
        const { width: w, height: h } = this.getSize(context);
        this.w = w;
        this.h = h;

        this.projector = new Projector({
            width: w / 20,
            x: w / 2,
            y: h - h * 0.6,
        });

        this.bounds = new Bounds(0, 0, w, h);
        this.shapes = [new SceneBounds(0, 0, w, h)];
    }

    getGradient(ctx, center, norm) {
        const radius = Math.max(this.w, this.h);
        const rx = center.x;
        const ry = center.y;
        const gradient = ctx.createRadialGradient(rx, ry, radius, rx, ry, 0);
        const alpha = 0.8 * norm;
        gradient.addColorStop(1, `rgba(244, 200, 219, ${alpha})`);
        gradient.addColorStop(0, 'rgba(244, 200, 219, 0)');
        return gradient;
    }

    drawLight(ctx) {
        const mouse = this.projector.source;
        const angle = this.projector.angle;
        const norm = this.projector.norm || 0;
        const spread = (Math.PI / 3) * (1 - norm) + 0.1;

        const segments = this.shapes.reduce((a, c) => a.concat(c.segments), []);

        // Sight Polygons
        var polygon = getSightPolygon(
            mouse.x,
            mouse.y,
            segments,
            angle,
            spread,
        );

        if (polygon.length) {
            ctx.fillStyle = this.getGradient(ctx, mouse, norm);
            ctx.beginPath();
            ctx.moveTo(polygon[0].x, polygon[0].y);
            polygon.forEach((p) => {
                ctx.lineTo(p.x, p.y);
            });
            ctx.fill();
        }
    }

    addShape() {
        const point = pointGenerator(this.bounds);
        this.shapes.push(
            new Shape({
                type: Shape.types.ZIGZAG,
                x: point.x,
                y: point.y,
                vx: utils.getRandomFloat(-2, 2),
                vy: utils.getRandomFloat(-2, 2),
                color: '#fffb74',
            }),
        );
    }

    setup = (context) => this.setupScene(context);

    resize = (context) => this.setupScene(context);

    draw = ({ ctx, pointer: { position: Mouse } }) => {
        this.projector.draw({ ctx });
        this.drawLight(ctx);
        this.shapes.forEach((shape) => shape.draw({ ctx }));
    };

    update = (context) => {
        this.projector.update(context);
        this.shapes.forEach((shape) =>
            shape.update({ ...context, bounds: this.bounds }),
        );
        this.shapes = this.shapes.filter(({ dead }) => !dead);

        if (this.shapes.length < 10) {
            this.addShape();
        }
    };
}
