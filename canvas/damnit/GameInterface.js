const X_OFFSET = 10;
const Y_OFFSET = 10;
const IMAGE_WIDTH = 20;
const BAR_WIDTH = 200;
const BAR_HEIGHT = 6;

export default class GameInterface {
    constructor(canvas, ctx, gameController, gameAssets) {
        this.dpr = window.devicePixelRatio;
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameController = gameController;
        this.gameAssets = gameAssets;
    }

    drawLives() {
        const { pizza } = this.gameAssets.images;
        const { lives } = this.gameController.state;

        let i = lives;

        while (i > 0) {
            const x = ((i - 1) * IMAGE_WIDTH + X_OFFSET) * this.dpr;
            const y = Y_OFFSET * this.dpr;
            this.ctx.fillStyle = 'slategray';
            this.ctx.drawImage(
                pizza,
                x,
                y,
                IMAGE_WIDTH * this.dpr,
                IMAGE_WIDTH * this.dpr
            );
            i--;
        }
    }

    drawPowerImage() {
        // const { hitPower } = this.gameController.state;
        // if (!hitPower) return;

        const { life } = this.gameAssets.images;
        const x = X_OFFSET * this.dpr;
        const y = (Y_OFFSET * 2 + IMAGE_WIDTH) * this.dpr;
        const w = IMAGE_WIDTH * this.dpr;
        const h = IMAGE_WIDTH * this.dpr;
        this.ctx.drawImage(life, x, y, w, h);
    }

    drawPower() {
        const { hitPower, maxHitPower } = this.gameController.state;
        const fullW = BAR_WIDTH * this.dpr;
        const x = (X_OFFSET * 2 + IMAGE_WIDTH) * this.dpr;
        const y = (Y_OFFSET * 2 + IMAGE_WIDTH * 1.5) * this.dpr;
        const w = hitPower / maxHitPower * fullW;
        const h = BAR_HEIGHT * this.dpr;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(x, y, w, h);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(x, y, fullW, h);
    }

    drawShieldImage() {
        // const { shieldPower } = this.gameController.state;
        // if (!shieldPower) return;

        const { shield } = this.gameAssets.images;
        const x = X_OFFSET * this.dpr;
        const y = (Y_OFFSET * 3 + IMAGE_WIDTH * 2) * this.dpr;
        const w = IMAGE_WIDTH * this.dpr;
        const h = IMAGE_WIDTH * this.dpr;
        this.ctx.drawImage(shield, x, y, w, h);
    }

    drawShield() {
        const { shieldPower, maxShieldPower } = this.gameController.state;
        const fullW = BAR_WIDTH * this.dpr;
        const x = (X_OFFSET * 2 + IMAGE_WIDTH) * this.dpr;
        const y = (Y_OFFSET * 3 + IMAGE_WIDTH * 2.5) * this.dpr;
        const w = shieldPower / maxShieldPower * fullW;
        const h = BAR_HEIGHT * this.dpr;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(x, y, w, h);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(x, y, fullW, h);
    }

    run() {
        this.drawLives();
        this.drawPowerImage();
        this.drawPower();

        this.drawShieldImage();
        this.drawShield();
    }
}
