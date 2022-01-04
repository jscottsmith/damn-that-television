const DECAY = 0.95;
export default class Notification {
  constructor(message, x, y, vx = 0, vy = -3) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.vx = vx;
    this.power = 1; // should be from 1 - 0
    this.multiplier = 25;
    this.dead = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.power *= DECAY;
    this.vx *= DECAY;

    // this.vy = this.vy * this.power;

    if (this.power < 0.01) {
      this.dead = true;
    }
  }

  draw({ dpr, ctx }) {
    ctx.globalAlpha = this.power;
    ctx.fillStyle = '#f7e7b3';
    ctx.textAlign = 'center';
    ctx.font = `${32 * dpr}px "futura-pt", sans-serif`;
    ctx.fillText(this.message, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}
