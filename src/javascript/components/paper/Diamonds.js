import { Paper, Group, Path, Point, Size, Shape } from './Paper';
import _ from 'lodash';
import modulo from '../../utils/modulo';

export default class Diamonds {
    constructor(canvas) {
        this.paper = Paper;
        this.canvas = canvas;
        this.rotateDelta = 1;
        Paper.setup(canvas);
    }

    init() {
        this.setSize();
        this.addListeners();
        this.drawBg();
        this.constructDiamonds();

        Paper.view.draw();

        // Animation Loop
        this.render();
    }

    teardown() {
        Paper.project.clear();
        Paper.project.remove();
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
        this.constructDiamonds();
    }

    handleMouse(event) {
        this.rotateDelta = event.point.x / Paper.view.bounds.width * 5;
    }

    constructDiamonds() {
        const size = Math.floor(Paper.view.bounds.width / 50);

        // top left triangle
        const p1 = new Point(0, 0);
        const p2 = new Point(0, size);
        const p3 = new Point(size, 0);
        const segments1 = [p1, p2, p3];
        const path1 = new Path(segments1);
        path1.closed = true;
        path1.fillColor = 'white';

        // bottom right triangle
        const p4 = new Point(size, 0);
        const p5 = new Point(size, size);
        const p6 = new Point(0, size);
        const segments2 = [p4, p5, p6];
        const path2 = new Path(segments2);
        path2.closed = true;
        path2.fillColor = '#222222';

        // create a group of the paths then a symbol
        const group = new Group([path1, path2]);
        this.diamond = new Paper.Symbol(group);

        this.layoutDiamonds(size);
    }

    layoutDiamonds(size) {
        // settings
        const minPadding = 100;
        const gutter = size * 0.7;

        // determine amount of diamonds
        const maxWidth = Paper.view.bounds.width - minPadding * 2 + gutter;
        const maxHeight = Paper.view.bounds.height - minPadding * 2 + gutter;
        const rows = modulo(maxWidth, size + gutter);
        const columns = modulo(maxHeight, size + gutter);
        let amount = rows * columns;

        // take the remainder after adding all the diamonds
        const xPadding =
            (Paper.view.bounds.width - (rows * size + (rows - 1) * gutter)) / 2;
        const yPadding =
            (Paper.view.bounds.height -
                (columns * size + (columns - 1) * gutter)) /
            2;

        // diamond position
        let x = xPadding + size / 2;
        let y = yPadding + size / 2;
        const maxX = x + maxWidth - gutter - size;

        // diamond rotation
        const delta = 360 / 12;
        let degrees = 0;

        while (amount > 0) {
            // place a symbol
            const diamond = this.diamond.place();

            diamond.position = new Point(x, y);
            diamond.rotate(degrees);

            // Layout
            if (x + gutter + size <= maxX) {
                x += gutter + size;
            } else {
                x = xPadding + size / 2;
                y += gutter + size;
            }

            // increment degrees
            if (degrees + delta < 360) {
                degrees += delta;
            } else {
                degrees = 0;
            }
            --amount;
        }

        // reference rectangle

        // const bounds = new Shape.Rectangle({
        //     x: xPadding,
        //     y: yPadding,
        //     width: maxWidth,
        //     height: maxHeight,
        // });
        // bounds.strokeColor = 'red';
    }

    drawBg() {
        const c = Paper.view.center;
        const topLeft = c.subtract(c.multiply(2));
        const bottomRight = c.add(c);
        const shape = new Shape.Rectangle(topLeft, bottomRight);
        shape.fillColor = '#cccccc';
    }

    setSize() {
        // set the size of the View to the window
        const w = window.innerWidth;
        const h = window.innerHeight;

        Paper.view.viewSize = new Size(w, h);
    }

    render() {
        Paper.view.onFrame = event => {
            // Animate things
            this.diamond.definition.rotate(this.rotateDelta);
        };
    }
}
