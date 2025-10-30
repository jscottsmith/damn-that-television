import { Entity } from '@gush/candybar';
import { COLORS } from 'constants/app';

const PATTERN_IMG = '/static/pattern-1.svg';

// function circleInOut(t) {
//     return (
//         ((t = t * 2) <= 1
//             ? 1 - Math.sqrt(1 - t * t)
//             : Math.sqrt(1 - (t = t - 2) * t) + 1) / 2
//     );
// }

// function circleOut(t) {
//     return Math.sqrt(1 - --t * t);
// }

export function cubicInOut(t) {
  return ((t = t * 2) <= 1 ? t * t * t : (t = t - 2) * t * t + 2) / 2;
}

const SPEED = 0.002;

class Pyramid extends Entity {
  constructor({ color, setupCanvas }) {
    super();
    this.color = color;
    this.setupCanvas = setupCanvas;
    this.t = 0;
    this.u = 0;
    this.x = 0;
    this.pattern = null;
  }

  loadPattern({ ctx }) {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const context = canvas.getContext('2d');

    img.onload = () => {
      context.drawImage(img, 0, 0, 200, 200);
      this.pattern = ctx.createPattern(canvas, 'repeat');
    };

    img.src = PATTERN_IMG;
  }

  setup = (context) => this.loadPattern(context);

  drawBaseLayer({ bounds, ctx }) {
    const height = bounds.h / 2;
    const width = height;
    const x1 = bounds.w / 2;
    const y1 = bounds.h - height;
    const x2 = bounds.w / 2 + width;
    const y2 = bounds.h;
    const x3 = bounds.w / 2 - width;
    const y3 = bounds.h;

    const x4 = x3 + this.x * width * 2;
    const x5 = x3 + this.z * width * 2;

    ctx.fillStyle = this.pattern;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLORS.club;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x5, y2);
    ctx.lineTo(x4, y3);
    ctx.closePath();
    ctx.fill();
  }

  updateTime() {
    this.t += SPEED;

    if (this.t >= 1) {
      this.t = 1;
      this.u += SPEED;
      if (this.u >= 1) {
        this.t = 0;
        this.u = 0;
      }
    }
  }

  draw = (context) => {
    this.drawBaseLayer(context);
  };

  update = () => {
    this.updateTime();
    this.x = cubicInOut(this.t);
    this.z = cubicInOut(this.u);
  };
}

export default Pyramid;
