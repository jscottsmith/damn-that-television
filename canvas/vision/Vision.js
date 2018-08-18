import { Entity, Bounds, utils } from '@gush/candybar';
import Projector from './Projector';
import Shape from './Shape';
import getSightPolygon from './src/rays';
import SceneBounds from './SceneBounds';
import randomPositionOutsideBounds from './randomPositionOutsideBounds';
import pointGenerator from './pointGenerator';

const { getRandomInt } = utils;

const types = [Shape.types.TRIANGLE, Shape.types.ZIGZAG, Shape.types.RING];
const colors = ['#72dbde', '#fffb74', '#ff714c', '#ea94ba'];

export default class Vision extends Entity {
    constructor(config) {
        super();
        this.getSize = config.getSize;
    }

    setupScene(context) {
        const { width, height } = this.getSize(context);
        const w = this.toValue(width);
        const h = this.toValue(height);
        this.w = w;
        this.h = h;

        this.numberOfShapes = Math.ceil(Math.max(width, height) / 100);

        this.projector = new Projector({
            radius: w / 20,
            x: w / 2,
            y: h - h * 0.25,
        });

        this.bounds = new Bounds(0, 0, w, h);

        const sceneShape = new SceneBounds(0, 0, w, h);
        sceneShape.replaceMe = true; // flag so it will be updated on resize

        if (!this.shapes) {
            // add shapes on init

            this.shapes = [sceneShape];
            let i = 0;
            while (i < this.numberOfShapes) {
                this.addShape(true);
                i++;
            }
        } else {
            // remove old scene bounds, replace with new
            this.shapes = [
                ...this.shapes.filter((s) => !s.replaceMe),
                sceneShape,
            ];
        }
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

    addShape(inside) {
        const shape = new Shape({
            type: types[getRandomInt(0, types.length - 1)],
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            color: colors[getRandomInt(0, colors.length - 1)], //
        });

        let startPosition = null;
        if (!inside) {
            startPosition = randomPositionOutsideBounds(
                this.bounds,
                shape.bounds,
            );
        } else {
            startPosition = pointGenerator(this.bounds);
        }

        const destPosition = pointGenerator(this.bounds);
        const [vx, vy] = startPosition.delta(destPosition);

        // move to the randomized position
        shape.moveTo(startPosition.x, startPosition.y);

        const speed =
            Math.max(shape.bounds.w, shape.bounds.h) /
            Math.max(this.bounds.w, this.bounds.h);

        shape.vx = vx * 0.02 * speed;
        shape.vy = vy * 0.02 * speed;

        this.shapes.push(shape);
    }

    updateShapes(context) {
        this.shapes.forEach((shape) => {
            // shapes also includs scenebounds which doens't move...
            // ignore that here
            if (shape.bounds) {
                const doesIntersectsBounds = this.bounds.intersectsWith(
                    shape.bounds,
                );
                // on first entersect mark as entered the scene
                if (doesIntersectsBounds) {
                    shape.entered = true;
                }
                // mark dead when it has left
                if (!doesIntersectsBounds && shape.entered) {
                    shape.dead = true;
                }
            }

            shape.update(context);
        });

        this.shapes = this.shapes.filter(({ dead }) => !dead);

        if (this.shapes.length < this.numberOfShapes) {
            this.addShape();
        }
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
        this.updateShapes(context);
    };
}
