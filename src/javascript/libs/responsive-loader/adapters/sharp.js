'use strict';

var sharp = require('sharp');

module.exports = function (imagePath) {
  var image = sharp(imagePath);

  return {
    metadata: function metadata() {
      return image.metadata();
    },
    resize: function resize(_ref) {
      var width = _ref.width,
          quality = _ref.quality,
          background = _ref.background,
          mime = _ref.mime;
      return new Promise(function (resolve, reject) {
        var resized = image.clone().resize(width, null);

        if (background) {
          resized = resized.background(background).flatten();
        }

        if (mime === 'image/jpeg') {
          resized = resized.jpeg({
            quality
          });
        }

        resized.toBuffer(function (err, data, _ref2) {
          var height = _ref2.height;

          if (err) {
            reject(err);
          } else {
            resolve({
              data,
              width,
              height
            });
          }
        });
      });
    }
  };
};