import { Point } from '@gush/candybar';
import { COLORS } from 'constants/app';
import loadImage from 'utils/loadImage';

const PATTERN_OK = '/static/pattern-ok.svg';
const ERASER = '/static/eraser.svg';

class Eraser {
  eraser: unknown;
  color: string;
  pattern: unknown;
  canvas: any;
  ctx: any;
  isDrawing: boolean;
  prevPoint: Point;

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
    this.prevPoint = lastPosition || tempPoint;
    const dist = this.prevPoint.distance(currentPoint);
    const angle = this.prevPoint.angleRadians(currentPoint);

    const r = dpr * 45;
    const hs = r / 2;

    if (this.isDrawing) {
      for (let i = 0; i < dist; i = i + 5) {
        const x = this.prevPoint.x + Math.cos(angle) * i - 25;
        const y = this.prevPoint.y + Math.sin(angle) * i - 25;
        this.ctx.beginPath();
        this.ctx.arc(x + hs, y + hs, r, false, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = this.pattern;
        this.ctx.fill();
      }
    }
    ctx.drawImage(this.canvas, ...bounds.params);
  }

  drawPencil({ ctx, dpr }) {
    if (!this.pattern || !this.eraser) return;
    const r = dpr * 45;
    const w = 112 * 4.5 * dpr * (this.isDrawing ? 0.95 : 1);
    const h = 150 * 4.5 * dpr * (this.isDrawing ? 0.95 : 1);
    const ox = r;
    const oy = h * 0.685;
    ctx.drawImage(
      this.eraser,
      this.prevPoint.x - ox,
      this.prevPoint.y - oy,
      w,
      h,
    );
  }

  handleMouseDown = () => {
    this.isDrawing = true;
  };
  handleMouseUp = () => {
    this.isDrawing = false;
  };

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

    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  destroy = () => {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  draw = (context) => {
    context.ctx.clearRect(...context.bounds.params);

    this.handleMousemove(context);
    this.drawPencil(context);
  };
}

export { Eraser };
