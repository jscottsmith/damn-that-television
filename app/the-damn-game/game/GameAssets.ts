import loadImage from 'utils/loadImage';

const logErr = (err) => console.log(err);

export default class assets {
  images: any;

  constructor(images, callback) {
    this.images = {};
    this.preload(images).then(callback).catch(logErr);
  }

  preload(images) {
    const allImages: Promise<unknown>[] = [];

    Object.keys(images).map((key) => {
      const promise = loadImage(images[key]);
      promise
        .then((img) => {
          this.images[key] = img;
        })
        .catch(logErr);
      allImages.push(promise);
    });

    return Promise.all(allImages);
  }
}
