import { Point } from '@gush/candybar';

export default class PointPhysics extends Point {
  constructor({ x, y, vx = 0, vy = 0, mass = 1, isFixed = false }) {
    super(x, y);
    this.vx = vx; // velocity x
    this.vy = vy; // velocity y
    this.fx = 0; // force x
    this.fy = 0; // force y
    this.g = 0.5; // gravity
    this.dx = 0; // delta x
    this.dy = 0; // delta y
    this.oldX = x;
    this.oldY = y;
    this.mass = mass;
    this.isFixed = isFixed;
  }

  delta() {
    return [this.x - this.oldX, this.y - this.oldY];
  }

  applyForce(x, y) {
    this.fx += x;
    this.fy += y;
  }

  solveVelocity(dpr) {
    this.oldX = this.x;
    this.oldY = this.y;

    // acceleration = force / mass;
    const ax = this.fx / this.mass;
    const ay = this.fy / this.mass;

    // velocity + acceleration
    this.vx += ax;
    this.vy += ay;

    // velocity from gravity
    this.vy = this.vy + this.g * dpr;

    this.x += this.vx;
    this.y += this.vy;

    // reset any applied forces
    this.fx = 0;
    this.fy = 0;
  }

  update = ({ dpr }) => {
    if (this.isFixed) return;
    this.solveVelocity(dpr);
  };

  draw = ({ ctx }) => {
    const { x, y } = this;
    ctx.fillStyle = 'red';
    ctx.lineWidth = 5;
    ctx.fillRect(x - 2, y - 2, 4, 4);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
}
