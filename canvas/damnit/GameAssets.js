const images = {
    bomb: '/static/damnit/bomb.png',
    damnit: '/static/damnit/damnit.png',
    fist: '/static/damnit/fist.png',
    hit: '/static/damnit/hit.png',
    life: '/static/damnit/life.png',
    pill: '/static/damnit/pill.png',
    pizza: '/static/damnit/pizza.png',
    shield: '/static/damnit/shield.png',
    shoot: '/static/damnit/shoot.png',
    tv: '/static/damnit/tv.png',
};

import loadImage from 'utils/loadImage';

export default class GameAssets {
    constructor(callback) {
        this.images = images;
        this.preload().then(callback);
    }

    preload() {
        const allImages = [];
        for (const key in this.images) {
            if (this.images.hasOwnProperty(key)) {
                const image = this.images[key];
                const promise = loadImage(image).then((img) => {
                    this.images[key] = img;
                });
                allImages.push(promise);
            }
        }

        return Promise.all(allImages);
    }
}
