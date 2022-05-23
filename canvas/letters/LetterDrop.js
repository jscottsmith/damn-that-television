import { Point, utils } from '@gush/candybar';
import PolyWave from './PolyWave';
// import Pyramid from './Pyramid';
import PhysicsPoint from './PhysicsPoint';
import Letter from './Letter';
import loadImage from 'utils/loadImage';
import { COLORS } from 'constants/app';
import { LYRICS_LETTERS } from '@/constants/found-a-job-lyrics';

const LETTER_WAVE_STRENGTH = 2;
const PATTERN_OK = '/static/pattern-0.svg';

export default class LetterDrop {
  constructor() {
    this.words = [...LYRICS_LETTERS];
    this.letters = [];
    this.drop = true;
  }

  createWave = ({ bounds, ctx, dpr }) => {
    const { w, h } = bounds;
    const x = 0;
    const y = h - h / 4;
    const verts = [
      { point: new Point(x, y), isSpring: true },
      { point: new Point(w, y) },
      { point: new Point(w, h) },
      { point: new Point(x, h) },
      { point: new Point(x, y) },
    ];

    this.polywave = new PolyWave({
      dpr,
      verts,
      elasticity: 0.24,
      damping: 0.84,
      color: COLORS.miami,
    });

    // this.pyramid = new Pyramid({ color: COLORS.club });
    // this.pyramid.setup({ ctx });
  };

  queueWord = (...args) => {
    this.words = [...args, ...this.words];
    this.drop = true;
  };

  dropWord({ bounds, dpr }) {
    this.drop = false;

    if (!this.words.length) {
      return;
    }

    const { w, h } = bounds;
    const word = this.words.shift();
    const letters = word.split('');
    const off = bounds.w / (letters.length + 1);
    const rw = w * 0.05;
    const vh = -h * 0.03;

    const points = letters.map((letter, i) => {
      // radius
      const r1 = rw;
      const r2 = rw + 40 * dpr;
      const radius = utils.getRandomFloat(r1, r2);
      // position
      const x = off * (i + 1);
      const y = bounds.h + radius * 2;
      // velocity
      const vx = utils.getRandomFloat(-5 * dpr, 5 * dpr);
      const vy1 = vh * 1.05;
      const vy2 = vh * 1.25;
      const vy = utils.getRandomFloat(vy1, vy2);

      const point = new PhysicsPoint({ x, y, vx, vy });

      return new Letter({
        point,
        letter,
        radius,
      });
    });

    this.letters = [...this.letters, ...points];
  }

  applyForceToWavePoints(letter, p2) {
    const distance = p2.distance(letter.point);
    const maxDist = letter.radius;

    if (distance < maxDist) {
      const [dx, dy] = letter.point.delta();
      const mass = letter.radius;
      const power = (1 - distance / mass) * LETTER_WAVE_STRENGTH;

      p2.applyForce(dx * power, dy * power);
    }
  }

  createPattern(ctx, img, w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext('2d');

    context.drawImage(img, 0, 0, w, h);
    const pattern = ctx.createPattern(canvas, 'repeat');
    pattern.setTransform(this.matrix);
    return pattern;
  }

  // lifecycles

  setup = (context) => {
    loadImage(PATTERN_OK).then((image) => {
      const w = 90 * context.dpr;
      const h = 90 * context.dpr;
      this.pattern = this.createPattern(context.ctx, image, w, h);
    });
    if (document) {
      this.matrix = new DOMMatrix();
    }
    this.createWave(context);
  };

  resize = (context) => {
    this.createWave(context);
    this.draw(context);
  };

  draw = (context) => {
    context.ctx.fillStyle = this.pattern;
    context.ctx.fillRect(...context.bounds.params);
    // this.pyramid.draw(context);
    this.letters.forEach((letter) => letter.draw(context));
    this.polywave.draw(context);
  };

  update = (context) => {
    if (this.pattern && this.pattern.setTransform) {
      // console.log(context.tick);
      // const tx = Math.sin(context.tick * 0.02) * 0.1;
      // const ty = Math.sin(context.tick * 0.01) * 0.1;
      // this.matrix.translateSelf(0.2, 0.5).rotateSelf(tx, ty);
      // this.pattern.setTransform(this.matrix);
    }
    if (context.tick % 120 === 0 && this.words.length === 0) {
      this.queueWord(...LYRICS_LETTERS);
    }
    if (context.tick % 120 === 0 && this.words.length !== 0) {
      this.drop = true;
    }
    if (this.drop && this.words.length !== 0) {
      this.dropWord(context);
    }

    this.polywave.points.forEach((point) => {
      this.letters.forEach((letter) => {
        this.applyForceToWavePoints(letter, point);
      });
    });
    this.polywave.update(context);

    this.letters.forEach((letter) => {
      if (context.bounds.intersectsWith(letter.bounds)) {
        letter.entered = true;
      } else if (letter.entered) {
        letter.dead = true;
      }
      letter.update(context);
    });

    this.letters = this.letters.filter((letter) => !letter.dead);

    // this.pyramid.update();
  };
}
