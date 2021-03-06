import { Point } from '@gush/candybar';
import { COLORS } from 'constants/app';
import loadImage from 'utils/loadImage';

const PATTERN_OK = '/static/pattern-ok.svg';
const ERASER = '/static/eraser.svg';

class Eraser {
  constructor() {
    this.color = COLORS.softy;
    this.pattern = null;
    this.eraser = null;
    this.isDrawing = false;
  }

  createLocal({ bounds }) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = bounds.w;
    this.canvas.height = bounds.h;
    this.ctx = this.canvas.getContext('2d');
  }

  createPattern(ctx, img, w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext('2d');

    context.drawImage(img, 0, 0, w, h);

    return ctx.createPattern(canvas, 'repeat');
  }

  handleMousemove({ pointer: { position, lastPosition }, ctx, dpr, bounds }) {
    if (!this.pattern || !this.eraser) return;
    const tempPoint = new Point(bounds.w / 2, bounds.h / 2);
    const currentPoint = position || tempPoint;
    const prevPoint = lastPosition || tempPoint;
    const dist = prevPoint.distance(currentPoint);
    const angle = prevPoint.angleRadians(currentPoint);
    const r = dpr * 45;
    const hs = r / 2;

    for (let i = 0; i < dist; i = i + 5) {
      const x = prevPoint.x + Math.cos(angle) * i - 25;
      const y = prevPoint.y + Math.sin(angle) * i - 25;
      this.ctx.beginPath();
      this.ctx.arc(x + hs, y + hs, r, false, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fillStyle = this.pattern;
      this.ctx.fill();
    }

    const w = 112 * 4.5 * dpr;
    const h = 150 * 4.5 * dpr;
    const ox = r * 0.8;
    const oy = h * 0.664;
    ctx.clearRect(...bounds.params);
    ctx.drawImage(this.canvas, ...bounds.params);
    ctx.drawImage(this.eraser, prevPoint.x - ox, prevPoint.y - oy, w, h);
  }

  resize = (context) => this.setup(context);

  setup = ({ dpr, ctx, bounds }) => {
    this.createLocal({ bounds });
    loadImage(PATTERN_OK).then((image) => {
      const w = 300 * dpr;
      const h = 300 * dpr;
      this.pattern = this.createPattern(ctx, image, w, h);
    });

    loadImage(ERASER).then((image) => {
      this.eraser = image;
    });
  };

  draw = (context) => {
    this.handleMousemove(context);
  };
}

export default Eraser;
