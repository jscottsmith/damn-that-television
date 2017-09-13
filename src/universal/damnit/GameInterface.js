export default class GameInterface {
    constructor(canvas, ctx, gameController) {
        this.dpr = window.devicePixelRatio;
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameController = gameController;
    }

    drawLives() {
        const { lives } = this.gameController.state;

        let i = lives;

        while (i > 0) {
            const x = i * 20 * this.dpr;
            const y = 30 * this.dpr;
            this.ctx.fillStyle = 'slategray';
            this.ctx.fillRect(x, y, 10 * this.dpr, 10 * this.dpr);
            i--;
        }
    }

    drawPower() {
        const { hitPower, maxHitPower } = this.gameController.state;
        const fullW = 300 * this.dpr;
        const x = 20 * this.dpr;
        const y = 50 * this.dpr;
        const w = hitPower / maxHitPower * fullW;
        const h = 10 * this.dpr;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(x, y, fullW, h);
        this.ctx.fillStyle = 'limegreen';
        this.ctx.fillRect(x, y, w, h);
    }

    drawShield() {
        const { shieldPower, maxShieldPower } = this.gameController.state;
        const fullW = 300 * this.dpr;
        const x = 20 * this.dpr;
        const y = 70 * this.dpr;
        const w = shieldPower / maxShieldPower * fullW;
        const h = 10 * this.dpr;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(x, y, fullW, h);
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(x, y, w, h);
    }

    run() {
        this.drawLives();
        this.drawPower();
        this.drawShield();
    }
}
