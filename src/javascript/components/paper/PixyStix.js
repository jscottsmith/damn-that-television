import { Paper, Tool, Path, Point, Size, Shape } from './Paper';
import _ from 'lodash';

export default class PixyStix {
    constructor(canvas) {
        this.paper = Paper;
        this.canvas = canvas;
        Paper.setup(canvas);
        this.lines = [];
        this.i = 0;
        this.even = false;
        this.MAX_LINES = 100;
        this.ROTATION_SPEED = 0.05;
    }

    init() {
        this.setSize();
        this.addListeners();
        this.drawBg();

        Paper.view.draw();

        this.render();
    }

    addListeners() {
        this.handleResize = this.handleResize.bind(this);
        this.handleMouse = this.handleMouse.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        Paper.view.onResize = _.throttle(this.handleResize, 50);

        const tool = new Tool();
        tool.onMouseMove = _.throttle(this.handleMouse, 5);
        tool.onMouseDown = this.handleMouseDown;
        tool.onKeyUp = this.handleKeyUp;
    }

    handleResize() {
        Paper.project.clear();
        this.drawBg();
    }

    handleMouse(event) {
        this.removeStix();
        this.addStix(event);
    }

    handleMouseDown() {
        this.deleteLines();
    }

    handleKeyUp(event) {
        this.deleteLines();
    }

    removeStix() {
        if (this.i >= this.MAX_LINES) {
            const line = this.lines[0];
            // scale down then remove
            TweenLite.to(line, 1, {
                strokeWidth: 0,
                ease: Power2.easeInOut,
                onComplete: () => {
                    // remove from Paper view
                    line.remove();
                },
            });

            // delete from array
            this.lines.splice(0, 1);
            // reset count
            this.i = this.MAX_LINES - 1;
        }
    }

    addStix(event) {
        const absDelta = event.delta.abs();
        const delta = absDelta.x > absDelta.y ? absDelta.x : absDelta.y;

        if (typeof this.lines[this.i] === 'undefined') {
            const line = new Path({
                segments: [event.point],
                strokeColor: this.even ? '#222222' : '#FFFFFF',
                strokeWidth: 0,
            });

            TweenLite.to(line, 1, {
                strokeWidth: 10 * delta,
                ease: Power2.easeInOut,
            });

            const { x, y } = Paper.view.center;
            TweenLite.to(line.position, 4, {
                x,
                y,
                ease: Back.easeInOut,
            });

            this.lines.push(line);
        } else {
            this.lines[this.i].add(event.point);
            this.even = !this.even;
            ++this.i;
        }
    }

    deleteLines() {
        const length = this.lines.length;
        this.lines.forEach((line, i) => {
            TweenLite.to(line, 0.5, {
                strokeWidth: 0,
                onComplete: () => {
                    line.remove();
                    if (i === length - 1) {
                        this.lines = [];
                        this.i = 0;
                        Paper.project.clear();
                    }
                },
            });
        });
    }

    drawBg() {
        const c = Paper.view.center;
        const topLeft = c.subtract(c.multiply(2));
        const bottomRight = c.add(c);
        const shape = new Shape.Rectangle(topLeft, bottomRight);
        shape.fillColor = '#eee';
    }

    setSize() {
        // set the size of the View to the window
        const w = window.innerWidth;
        const h = window.innerHeight;

        Paper.view.viewSize = new Size(w, h);
    }

    render() {
        Paper.view.onFrame = event => {
            this.lines.map(line => {
                line.rotate(this.ROTATION_SPEED);
            });
        };
    }
}
