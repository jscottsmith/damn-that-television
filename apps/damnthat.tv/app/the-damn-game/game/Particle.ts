import { getRandomInt, aabb2DIntersection } from './gameUtils';

export default class Particle {
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  dead: boolean;
  dpr: number;

  constructor({ x, y, dpr }) {
    this.dpr = dpr;
    this.gravity = 0.25 * this.dpr;
    this.w = 5 * this.dpr;
    this.h = 5 * this.dpr;
    this.x = x;
    this.y = y;
    this.vx = getRandomInt(-7, 7) * this.dpr;
    this.vy = getRandomInt(-7, 7) * this.dpr;
    this.dead = false;
  }

  update(gameBounds) {
    const { vx, vy, gravity } = this;

    // apply gravity to the particle velocity
    this.vy += gravity;

    // now velocities
    this.x += vx;
    this.y += vy;

    if (gameBounds) {
      // if it intersects with the game bounds it's not dead
      const doesIntersect = aabb2DIntersection(gameBounds, this);
      this.dead = !doesIntersect;
    }
  }

  draw({ ctx }) {
    const { x, y, w, h } = this;
    ctx.fillStyle = '#fffb74';
    ctx.fillRect(x, y, w, h);
  }
}
