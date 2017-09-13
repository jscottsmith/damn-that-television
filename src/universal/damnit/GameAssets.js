const images = {
    bomb: require('./assets/bomb.png'),
    damnit: require('./assets/damnit.png'),
    fist: require('./assets/fist.png'),
    hit: require('./assets/hit.png'),
    life: require('./assets/life.png'),
    pill: require('./assets/pill.png'),
    pizza: require('./assets/pizza.png'),
    shield: require('./assets/shield.png'),
    shoot: require('./assets/shoot.png'),
    tv: require('./assets/tv.png'),
};

import loadImage from '../../universal/utils/loadImage';

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
                const promise = loadImage(image).then(img => {
                    this.images[key] = img;
                });
                allImages.push(promise);
            }
        }

        return Promise.all(allImages);
    }
}
