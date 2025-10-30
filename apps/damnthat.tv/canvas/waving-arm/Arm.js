import { Entity, PointPhysics, Stick } from '@gush/candybar';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

//* ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Body
//* ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Arm extends Entity {
  constructor({
    width,
    height,
    position,
    resolution,
    color,
    force,
    holeColor,
  }) {
    super();
    this.width = width;
    this.holeWidth = width * 1.5;
    this.holeHeight = width / 2;
    this.color = color;
    this.holeColor = holeColor;
    this.height = height;
    this.position = position;
    this.resolution = resolution;
    this.force = force;
    this.spine = [];
    this.sticks = [];

    this.constructSpine();
  }

  constructSpine() {
    const amount = this.height / this.resolution;
    const pointAmt = Math.round(amount);
    const offY = this.height / pointAmt;
    const x = this.position.x;

    for (let i = 0; i <= pointAmt; i++) {
      const y = this.position.y - offY * i;
      const point = new PointPhysics({
        x,
        y,
        isFixed: i === 0,
        mass: 1.9,
      });
      this.spine.push(point);
    }

    this.sticks = this.spine
      .map((p, i) => {
        if (i < pointAmt) {
          return new Stick({
            p1: p,
            p2: this.spine[i + 1],
          });
        }
        return null;
      })
      .filter((stick) => stick);
  }

  drawShade = ({ ctx }) => {
    const g1 = this.spine[0];
    const g2 = this.spine[1];

    const dist = Math.floor(g1.distance(g2) / 2);
    // const rad = g1.angleRadians(g2);
    // const [dx, dy] = g2.delta(g1);

    let i = dist;
    while (i >= 0) {
      const n = i / dist;
      const x = lerp(g2.x, g1.x, n);
      const y = lerp(g2.y, g1.y, n);
      // ctx.fillStyle = 'red';
      // ctx.fillRect(x, y, 2, 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(x, y, this.width / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = this.holeColor;
      ctx.globalAlpha = n;
      ctx.beginPath();
      ctx.arc(x, y, this.width / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1;
      i--;
    }
  };

  // drawShade = ({ ctx }) => {
  //     const g1 = this.spine[0];
  //     const g2 = this.spine[1];
  //     const dist = g1.distance(g2);
  //     const rad = g1.angleRadians(g2);
  //     ctx.save();
  //     ctx.translate(g1.x, g1.y);
  //     ctx.rotate(rad);
  //     ctx.fillStyle = this.color;
  //     ctx.beginPath();
  //     ctx.arc(dist, 0, this.width / 2, 0, Math.PI * 2, true);
  //     ctx.closePath();
  //     ctx.fill();
  //     const gradient = ctx.createLinearGradient(0, 0, dist, 0);
  //     gradient.addColorStop(1, this.color);
  //     gradient.addColorStop(0, this.holeColor);
  //     ctx.fillStyle = gradient;
  //     ctx.fillRect(0, this.width / -2, dist, this.width);
  //     ctx.restore();
  // };

  draw = ({ ctx }) => {
    this.drawShade({ ctx });
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.lineCap = '';
    ctx.lineJoin = 'round';

    // spine
    ctx.beginPath();
    this.spine.forEach((point, i) => {
      // skip first point, handled by drawShade
      if (i === 0) return;
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    // this.spine.forEach(p => p.draw({ ctx }));
  };

  update = (context) => {
    const { tick } = context;
    const l = this.spine.length;
    this.sticks.forEach((stick) => stick.update(context));
    this.spine.forEach((point, i) => {
      point.applyForce(...this.force.position);
      const fx = this.toValue(Math.sin(i - tick / 3) * 0.055 * (l - i));
      point.applyForce(fx, 0);
      point.update(context);
    });
  };
}

export default Arm;
