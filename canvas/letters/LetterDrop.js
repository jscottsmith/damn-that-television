import { Point, utils } from '@gush/candybar';
import PolyWave from './PolyWave';
import Pyramid from './Pyramid';
import PhysicsPoint from './PhysicsPoint';
import Letter from './Letter';

const MOUSE_RADIUS = 100;
const MOUSE_STRENGTH = 4;

export default class LetterDrop {
    constructor() {
        this.words = [];
        this.letters = [];
    }

    createWave = ({ bounds, dpr }) => {
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
            verts,
            elasticity: 0.24,
            damping: 0.84,
            color: '#2c2f34',
        });

        this.pyramid = new Pyramid({ color: '#d6f1d1' });
    };

    queueWord = (word) => {
        this.words = [word, ...this.words];
        this.drop = true;
    };

    dropWord({ bounds, dpr }) {
        this.drop = false;
        const { w, h } = bounds;
        const word = this.words.pop();
        const letters = word.split('');
        const off = bounds.w / (letters.length + 1);
        const points = letters.map((letter, i) => {
            const radius = utils.getRandomFloat(10, 30) + 10 * dpr * (i + 1);

            const x = off * (i + 1);
            const y = bounds.h - radius;
            const vx = utils.getRandomFloat(-5 * dpr, 5 * dpr);
            const vy = utils.getRandomFloat((-h / 100) * dpr, (-h / 100) * dpr);

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
        const { x, y } = letter.point;

        const distance = p2.distance(letter.point);
        const maxDist = letter.radius / 2;

        if (distance < maxDist) {
            const [dx, dy] = letter.point.delta();
            const mass = letter.radius;
            const power = (1 - distance / mass) * MOUSE_STRENGTH;

            p2.applyForce(dx * power, dy * power);
        }
    }

    // lifecycles

    setup = (context) => this.createWave(context);

    resize = (context) => this.createWave(context);

    draw = (context) => {
        this.letters.forEach((letter) => letter.draw(context));
        this.pyramid.draw(context);
        this.polywave.draw(context);
    };

    update = (context) => {
        if (this.drop && this.words.length) {
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

        this.pyramid.update();
    };
}
