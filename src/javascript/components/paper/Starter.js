import { Paper, Tool, Path, Point, Size, Shape } from './Paper';
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
        console.warn('mouse moved');
    }

    handleMouseDown() {
        console.warn('mouse pressed');
    }

    handleKeyUp(event) {
        console.warn('key pressed');
        if (event.key === 'space') {
            console.warn('space pressed');
        }
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
