// Paper references
import { Paper, Path, Point, Size, Shape } from './Paper';

export default class Waves {
    constructor(canvas) {
        this.paper = Paper;
        this.canvas = canvas;
        Paper.setup(canvas);
    }

    init() {
        this.setSize();
        this.drawBg();
        this.drawCircle();

        // Install Paper classes to the window.
        // Paper.install(window);

        // Draw a path for shits
        this.path = new Path();
        this.path.strokeColor = 'black';
        this.path.strokeWidth = '4';
        const start = new Point(100, 100);

        // Move to start and draw a line from there
        this.path.moveTo(start);

        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        this.path.lineTo(start.add([200, -50]));

        // Draw the view now:
        Paper.view.draw();

        Paper.view.onResize = (event) => {
            this.drawBg();
            this.init();
        };

        // bind the resize to Waves class
        Paper.view.onResize.bind(this);

        // Draw frames
        this.render();
    }

    drawCircle() {
        this.circle = new Path.Circle(Paper.view.center, 4);
        this.circle.strokeWidth = '4';
        this.circle.strokeColor = 'black';
    }

    drawBg() {
        const c = Paper.view.center;
        const topLeft = c.subtract(c.multiply(2));
        const bottomRight = c.add(c);
        const shape = new Shape.Rectangle(topLeft, bottomRight);
        shape.fillColor = 'white';

        // Gradient fill example
        // shape.fillColor = {
        //     gradient: {
        //         stops: ['white', 'black'],
        //     },
        //     origin: topLeft,
        //     destination: bottomRight,
        // };
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

        let scale = 1;
        Paper.view.onFrame = (event) => {
            // On each frame, rotate the path by 3 degrees:
            this.path.rotate(1);
            this.circle.scale(scale += 0.0001);

            if (!this.circle.bounds.topLeft.isInside(Paper.view.bounds)) {
                scale = 0.1;
            }
        };
        Paper.view.onFrame.bind(this);
    }
}
