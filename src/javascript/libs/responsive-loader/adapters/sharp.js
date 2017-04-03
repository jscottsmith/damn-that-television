
const sharp = require('sharp');

module.exports = function(imagePath) {
    const image = sharp(imagePath);

    return {
        metadata: function metadata() {
            return image.metadata();
        },
        resize: function resize(_ref) {
            let width = _ref.width,
                quality = _ref.quality,
                background = _ref.background,
                mime = _ref.mime;
            return new Promise(function(resolve, reject) {
                let resized = image.clone().resize(width, null);

                if (background) {
                    resized = resized.background(background).flatten();
                }

                if (mime === 'image/jpeg') {
                    resized = resized.jpeg({
                        quality,
                    });
                }

                resized.toBuffer(function(err, data, _ref2) {
                    const height = _ref2.height;

                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            data,
                            width,
                            height,
                        });
                    }
                });
            });
        },
    };
};
