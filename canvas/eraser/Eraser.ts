import { Point } from '@gush/candybar';
import { COLORS } from 'constants/app';
import loadImage from 'utils/loadImage';

const PATTERN_OK = '/static/pattern-ok.svg';
const ERASER_PENCIL = '/static/eraser.svg';
const ERASER_SHADOW = '/static/eraser-shadow.svg';

class Eraser {
  eraser: any;
  shadow: any;
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
    if (!context) return;
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

    const scale = bounds.w / (1300 * dpr);
    const r = dpr * 50 * scale;

    const erase = (x: number, y: number) => {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, false, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fillStyle = this.pattern;
      this.ctx.fill();
    };

    if (this.isDrawing) {
      erase(position.x, position.y);
      for (let i = 0; i < dist; i = i + 2) {
        const x = this.prevPoint.x + Math.cos(angle) * i;
        const y = this.prevPoint.y + Math.sin(angle) * i;
        erase(x, y);
      }
    }
    ctx.drawImage(this.canvas, ...bounds.params);
  }

  drawPencil({ ctx, dpr, bounds }) {
    if (!this.pattern || !this.eraser) return;
    const scale = bounds.w / (1300 * dpr);
    const r = dpr * 50 * scale;
    const w = this.eraser.width * dpr * scale;
    const h = this.eraser.height * dpr * scale;
    const w2 = this.shadow.width * dpr * scale;
    const h2 = this.shadow.height * dpr * scale;
    const ox = r;
    const oy = h - r + (this.isDrawing ? 0 : h * 0.1);
    const oy2 = -r + (this.isDrawing ? 0 : h2 * 0.1);
    ctx.drawImage(
      this.shadow,
      this.prevPoint.x - ox,
      this.prevPoint.y + oy2,
      w2,
      h2,
    );

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

    loadImage(ERASER_PENCIL).then((image) => {
      this.eraser = image;
    });
    loadImage(ERASER_SHADOW).then((image) => {
      this.shadow = image;
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
