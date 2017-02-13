import { Paper, Tool, Path, Point, Size, Shape } from './Paper';
import _ from 'lodash';

export default class Starter {
    constructor(canvas) {
        this.paper = Paper;
        this.canvas = canvas;
        Paper.setup(canvas);
    }

    init() {
        this.score = 0;
        this.bombs = [];

        this.setSize();
        this.addListeners();
        this.drawBg();
        this.constructGun();
        this.constructAmmunition();
        this.constructTarget();
        this.moveTarget();
        this.displayScore();
        this.generateBeeHivePoints(Paper.view.size.divide(100), true);
        Paper.view.draw();

        this.render();
    }

    teardown() {
        console.warn('teardown');
        if (this.target) {
            TweenLite.killTweensOf(this.target);
        }
        Paper.project.clear();
        Paper.project.remove();
        this.tool.remove();
    }

    addListeners() {
        this.handleResize = this.handleResize.bind(this);
        this.handleMouse = this.handleMouse.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        Paper.view.onResize = _.throttle(this.handleResize, 50);

        this.tool = new Tool();
        this.tool.onMouseMove = _.throttle(this.handleMouse, 5);
        this.tool.onMouseDown = this.handleMouseDown;
        this.tool.onKeyUp = this.handleKeyUp;
    }

    handleResize() {
        Paper.project.clear();
        this.drawBg();
        this.constructGun();
        this.constructAmmunition();
        this.constructTarget();
    }

    handleMouse(event) {
        const mouse = event.point;
        this.updateGunPosition(mouse.x);
    }

    handleMouseDown() {
        this.fireBullet();
    }

    handleKeyUp(event) {
        if (event.key === 'r') {
            this.constructAmmunition(10);
        }
        if (event.key === 'space') {
            this.fireBullet();
        }
    }

    constructGun() {
        const width = 10;
        const height = 40;

        const x = Paper.view.center.x - width / 2;
        const y = Paper.view.bounds.bottomCenter.y - height;

        this.gun = new Shape.Rectangle({
            point: [x, y],
            size: [width, height],
            fillColor: '#222222',
        });
    }

    constructAmmunition(amount = 10) {
        if (this.ammunition) {
            this.ammunition.forEach(bullet => bullet.remove());
        }

        this.ammunition = [];

        let i = amount;
        while (i > 0) {
            const radius = 10;
            const x = radius + radius / 2;
            const y = Paper.view.bounds.bottomLeft.y - radius * 1.5 * 2 * i;
            const bullet = new Shape.Circle({
                radius,
                center: [x, y],
                fillColor: '#222222',
            });
            this.ammunition.push(bullet);
            --i;
        }
    }

    constructTarget() {
        const width = 200;
        const height = 20;

        const x = Paper.view.bounds.topCenter.x - height;
        const y = Paper.view.bounds.topCenter.y;

        this.target = new Shape.Rectangle({
            point: [x, y],
            size: [width, height],
            fillColor: '#222222',
        });
    }

    generateBeeHivePoints(size, loose) {
        const points = [];
        const col = Paper.view.size.divide(size);
        for (let i = -1; i < size.width + 1; i++) {
            for (let j = -1; j < size.height + 1; j++) {
                const point = new Point(i, j);
                point.divide(new Point(size));
                point.multiply(Paper.view.size.add(col / 2));
                // debugger;

                if (j % 2) {
                    point.add(new Point(col.width / 2, 0));
                }
                if (loose) {
                    // point.add((col / 4) * Point.random() - col / 4);
                }

                points.push(point);
            }
        }

        points.map(point => {
            const circle = new Shape.Circle({
                center: point,
                radius: 5,
                fillColor: '#222',
            });
        });

        // return points;
    }

    displayScore() {
        const x = Paper.view.bounds.topRight.x - 50;
        const y = Paper.view.bounds.topRight.y + 50;

        this.scoreDisplay = new Paper.PointText({
            point: [x, y],
            fontFamily: 'futura-pt, san-serif',
            fontSize: 32,
            fontColor: '#222222',
            justification: 'right',
            content: this.score,
        });
    }

    handleHitTarget() {
        this.increaseScore();
    }

    increaseScore() {
        this.score += 100;
        this.scoreDisplay.content = this.score;
    }

    moveTarget() {
        const currentX = this.target.position.x;
        const x = _.random(0, Paper.view.bounds.topRight.x);
        const delta = Math.abs(currentX - x);
        const time = delta / Paper.view.bounds.width * 10;

        TweenLite.to(this.target.position, time, {
            x,
            ease: Power1.easeInOut,
            onComplete: () => {
                this.dropBomb();
                this.moveTarget();
            },
        });
    }

    dropBomb() {
        const width = this.target.bounds.width;
        const height = this.target.bounds.height;

        const x = this.target.position.x - width / 2;
        const y = Paper.view.bounds.topCenter.y;

        const bomb = new Shape.Rectangle({
            point: [x, y],
            size: [width, height],
            fillColor: '#FFFFFF',
        });

        const endY = Paper.view.bounds.bottomCenter.y + height / 2;
        TweenLite.to(bomb.position, 2, {
            y: endY,
            onUpdate: () => {
                if (bomb.intersects(this.gun)) {
                    console.warn('boom!');
                }
            },
            onComplete: () => {
                // remove bullet
                bomb.remove();
            },
        });
    }

    updateGunPosition(x) {
        this.gun.position.x = x;
    }

    fireBullet() {
        // check for ammunition
        // return if need to reload
        if (this.ammunition.length === 0) {
            console.warn('reload');
            return;
        }

        const x = this.gun.position.x;
        const y = this.gun.position.y;
        const i = 0;

        const bullet = this.ammunition[i];

        bullet.position.x = x;
        bullet.position.y = y;

        this.ammunition.splice(i, 1);

        const endY = Paper.view.bounds.topCenter.y;

        TweenLite.to(bullet.position, 0.5, {
            y: endY,
            ease: 'linear',
            onComplete: () => {
                // check for hit
                if (this.target.hitTest(bullet.position)) {
                    this.handleHitTarget();
                }
                // remove bullet
                bullet.remove();
            },
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
        Paper.view.onFrame = (event) => {
            // Animate things
        };
    }
}
