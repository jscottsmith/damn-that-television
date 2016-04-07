import { Paper, Path, Point, Size, Shape } from './Paper';

export default class Starter {
    constructor(canvas) {
        this.paper = Paper;
        this.canvas = canvas;
        Paper.setup(canvas);
    }

    init() {
        this.setSize();
        this.drawBg();

        Paper.view.draw();

        Paper.view.onResize = (event) => {
            this.drawBg();
            this.init();
        };

        // Draw frames
        this.render();
    }

    drawBg() {
        const c = Paper.view.center;
        const topLeft = c.subtract(c.multiply(2));
        const bottomRight = c.add(c);
        const shape = new Shape.Rectangle(topLeft, bottomRight);
        shape.fillColor = 'white';
    }

    setSize() {
        // set the size of the canvas/view to the window
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.canvas.width = w;
        this.canvas.height = h;

        Paper.view.viewSize = new Size(w, h);
    }

    render() {
        Paper.view.onFrame = (event) => {
            // Animate things
        };
    }
}
