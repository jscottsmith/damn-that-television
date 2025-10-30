import { Entity } from '@gush/candybar';

class Hand extends Entity {
  constructor({ p1, p2, isLeft, width }) {
    super();
    this.p2 = p2;
    this.p1 = p1;
    this.width = width;
    this.isLeft = isLeft;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement('img');
    this.image.onload = this.handleLoad;
    this.image.src = '/static/hand.svg';
    this.setAngle();
  }

  handleLoad = ({ target: { height, width } }) => {
    const ratio = width / height;
    const w = this.width;
    const h = this.width / ratio;
    // set sizes
    this.h = this.canvas.height = this.image.height = h;
    this.w = this.canvas.width = this.image.width = w;
    this.drawHand();
  };

  setAngle() {
    this.theta = this.p1.angleRadians(this.p2) - Math.PI / 2;
  }

  drawHand() {
    const { h, w } = this;
    this.ctx.drawImage(this.image, 0, 0, w, h);
  }

  draw = ({ ctx }) => {
    const { h, w } = this;
    const offX = w / 2.7;
    const offY = h / 1.2;
    const x = this.p1.x;
    const y = this.p1.y;
    ctx.save();
    ctx.translate(x, y);
    if (this.isLeft) {
      ctx.scale(-1, 1);
    }
    ctx.rotate(this.isLeft ? -this.theta : this.theta);
    // ctx.shadowColor = '#665b85'
    // ctx.shadowBlur = 0;
    // ctx.shadowOffsetX = this.toValue(10);
    // ctx.shadowOffsetY = this.toValue(-5);
    ctx.drawImage(this.canvas, -offX, -offY, w, h);
    ctx.restore();
  };

  update = () => {
    this.setAngle();
  };
}

export default Hand;
