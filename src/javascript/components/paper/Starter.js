import { Paper, Path, Point, Size, Shape } from './Paper';
import _ from 'lodash';

export default class Starter {
    constructor(canvas) {
        this.paper = Paper;
        this.canvas = canvas;
        Paper.setup(canvas);
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
        Paper.view.onResize = _.throttle(this.handleResize, 50);
        Paper.view.on('mousemove', _.throttle(this.handleMouse, 50));
    }

    handleResize() {
        Paper.project.clear();
        this.drawBg();
    }

    handleMouse(event) {

    }

    drawBg() {
        const c = Paper.view.center;
        const topLeft = c.subtract(c.multiply(2));
        const bottomRight = c.add(c);
        const shape = new Shape.Rectangle(topLeft, bottomRight);
        shape.fillColor = 'white';
    }

    setSize() {
        // set the size of the View to the window
        const w = window.innerWidth;
        const h = window.innerHeight;

        Paper.view.viewSize = new Size(w, h);
    }

    render() {
        Paper.view.onFrame = (event) => {
            // Animate things
        };
    }
}
