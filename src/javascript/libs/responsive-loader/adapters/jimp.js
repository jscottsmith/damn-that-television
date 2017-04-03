'use strict';

var jimp = require('jimp');

module.exports = function (imagePath) {
  var readImage = jimp.read(imagePath);

  return {
    metadata: function metadata() {
      return readImage.then(function (image) {
        return { width: image.bitmap.width, height: image.bitmap.height };
      });
    },
    resize: function resize(_ref) {
      var width = _ref.width,
          quality = _ref.quality,
          background = _ref.background,
          mime = _ref.mime;
      return new Promise(function (resolve, reject) {
        readImage.then(function (image) {
          image.clone().resize(width, jimp.AUTO).quality(quality).background(parseInt(background, 16) || 0xFFFFFFFF).getBuffer(mime, function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve({
                data,
                width,
                height: this.bitmap.height
              });
            }
          });
        });
      });
    }
  };
};