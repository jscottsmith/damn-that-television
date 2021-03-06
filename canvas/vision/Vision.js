import { Bounds, Point, utils } from '@gush/candybar';
import Projector from './Projector';
import Shape from './Shape';
import getSightPolygon from './src/rays';
import SceneBounds from './SceneBounds';
import randomPositionOutsideBounds from './randomPositionOutsideBounds';
import pointGenerator from './pointGenerator';
import { COLORS } from 'constants/app';

const { getRandomInt } = utils;

const types = [Shape.types.TRIANGLE, Shape.types.ZIGZAG, Shape.types.RING];
const colors = [COLORS.miami, COLORS.fab, COLORS.lit, COLORS.pepto];

export default class Vision {
  setupScene(context) {
    const width = context.canvas.clientWidth;
    const height = context.canvas.clientHeight;
    const w = width * context.dpr;
    const h = height * context.dpr;
    this.w = w;
    this.h = h;

    this.numberOfShapes = Math.ceil(Math.max(width, height) / 100);

    const r = Math.max(width, height);

    this.projector = new Projector({
      radius: r / 20,
      p1: new Point(w / 2, h - h * 0.5),
      p2: new Point(w / 2, h - h * 0.15),
    });

    this.bounds = new Bounds(0, 0, w, h);

    const sceneShape = new SceneBounds(0, 0, w, h);

    sceneShape.replaceMe = true; // flag so it will be updated on resize

    if (!this.shapes) {
      // add shapes on init

      this.shapes = [sceneShape];
      let i = 0;
      while (i < this.numberOfShapes) {
        this.addShape(context, true);
        i++;
      }
    } else {
      // remove old scene bounds, replace with new
      this.shapes = [...this.shapes.filter((s) => !s.replaceMe), sceneShape];
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
    const spread = (Math.PI / 6) * (1 - norm) + 0.05;

    const segments = this.shapes.reduce((a, c) => a.concat(c.segments), []);

    // Sight Polygons
    const polygon = getSightPolygon(mouse.x, mouse.y, segments, angle, spread);

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

  addShape(context, isInsideBounds) {
    const shape = new Shape({
      type: types[getRandomInt(0, types.length - 1)],
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      color: colors[getRandomInt(0, colors.length - 1)],
      dpr: context.dpr,
    });

    let startPosition = null;
    if (!isInsideBounds) {
      startPosition = randomPositionOutsideBounds(this.bounds, shape.bounds);
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
        const doesIntersectsBounds = this.bounds.intersectsWith(shape.bounds);
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
      this.addShape(context);
    }
  }

  setup = (context) => this.setupScene(context);

  resize = (context) => this.setupScene(context);

  draw = ({ ctx, bounds }) => {
    ctx.fillStyle = COLORS.club;
    ctx.fillRect(...bounds.params);
    this.projector.draw({ ctx });
    this.drawLight(ctx);
    this.shapes.forEach((shape) => shape.draw({ ctx }));
  };

  update = (context) => {
    this.projector.update(context);
    this.updateShapes(context);
  };
}
