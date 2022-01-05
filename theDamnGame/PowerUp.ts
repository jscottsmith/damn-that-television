import { aabb2DIntersection } from './gameUtils';
import { Bounds } from './types';

export default class PowerUp {
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bounds: Bounds;
  ctx: any;
  canvas: any;
  image: any;
  type: string;
  dead: boolean;

  constructor({ image, type, size = 40, x, y, dpr }) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.image = image;
    this.type = type;

    this.w = size;
    this.h = size;
    this.x = x - this.w / 2;
    this.y = y - this.h / 2;

    this.bounds = {
      w: this.w,
      h: this.h,
      x: this.x,
      y: this.y,
    };

    this.vx = 0;
    this.vy = 5 * dpr;

    this.canvas.width = this.w;
    this.canvas.height = this.h;

    this.dead = false;

    this.draw();
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.bounds.x = x;
    this.bounds.y = y;
  }

  update(gameBounds) {
    // call update method based on type
    this.vy += 0.1;
    const x = this.x;
    const y = this.y + this.vy;
    this.setPosition(x, y);

    if (gameBounds) {
      // if it intersects with the game bounds it's not dead
      const doesIntersect = aabb2DIntersection(gameBounds, this);
      this.dead = !doesIntersect;
    }
  }

  draw() {
    const { image, w, h } = this;
    this.ctx.drawImage(image, 0, 0, w, h);
    // this.ctx.strokeStyle = 'red';
    // this.ctx.lineWidth = 1;
    // this.ctx.strokeRect(0, 0, w, h);
  }
}
