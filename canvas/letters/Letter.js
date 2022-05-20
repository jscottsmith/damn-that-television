import { Point, Bounds, utils } from '@gush/candybar';
import { COLORS } from 'constants/app';

export default class Letter {
  constructor({ point, letter, radius }) {
    this.point = point;
    this.letter = letter.toUpperCase();
    this.radius = radius;
    this.width = radius * 3 * window.devicePixelRatio;
    this.height = radius * 3 * window.devicePixelRatio;
    this.center = new Point(radius, radius);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.rotation = utils.getRandomFloat(-Math.PI, Math.PI);
    this.spin = utils.getRandomFloat(-0.1, 0.1);
    this.depth = utils.getRandomFloat(-0.5, 0.8);
    this.shadowOffset = this.radius / 6;
    // state for scene
    this.entered = false;
    this.dead = false;

    this.bounds = new Bounds(
      point.x - radius,
      point.y - radius,
      this.width,
      this.height,
    );

    this.drawLocal();
  }

  drawLocal = () => {
    const { ctx, radius } = this;

    // ctx.fillStyle = COLORS.deep;
    // ctx.fillRect(0, 0, 100, 100);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(this.rotation);

    // ctx.beginPath();
    // ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowColor = COLORS.deep;
    ctx.shadowOffsetX = this.shadowOffset;
    ctx.shadowOffsetY = this.shadowOffset;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${radius * 1.3}px futura-pt `;
    ctx.fillStyle = COLORS.cream;
    ctx.fillText(this.letter, 0, 0);

    ctx.restore();
  };

  update = (context) => {
    this.rotation += this.spin;
    this.shadowOffset += this.depth;

    this.point.update(context);
    const [dx, dy] = this.point.delta();
    this.bounds.move(dx, dy);
  };

  draw = ({ ctx }) => {
    this.drawLocal();

    ctx.save();
    ctx.translate(-this.radius, -this.radius);
    ctx.drawImage(
      this.canvas,
      this.point.x,
      this.point.y,
      this.width,
      this.height,
    );
    ctx.restore();
  };
}
