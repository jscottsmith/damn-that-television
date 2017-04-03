'use strict';

var path = require('path');
var loaderUtils = require('loader-utils');

var MIMES = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png'
};

module.exports = function loader(content) {
  this.cacheable && this.cacheable();
  var loaderCallback = this.async();
  var config = loaderUtils.getLoaderConfig(this, 'responsiveLoader');
  var sizes = config.size || config.sizes || [Number.MAX_SAFE_INTEGER];
  var name = config.name || '[hash]-[width].';
  var outputContext = config.context || '';
  var outputPlaceholder = config.placeholder || false;
  var placeholderSize = config.placeholderSize || 40;
  // JPEG compression
  var quality = parseInt(config.quality, 10) || 95;
  // Useful when converting from PNG to JPG
  var background = config.background;
  // Specify ext to convert to another format
  var ext = config.ext || path.extname(this.resourcePath).replace(/\./, '');
  var mime = MIMES[ext];
  var adapter = config.adapter || require('./adapters/jimp');
  var loaderContext = this;

  if (!sizes) {
    return loaderCallback(null, content);
  }

  if (!mime) {
    return loaderCallback(new Error('No mime type for file with extension ' + ext + 'supported'));
  }

  if (config.pass) {
    // emit original content only
    var f = loaderUtils.interpolateName(loaderContext, '[hash].[ext]', { context: outputContext, content: content });
    loaderContext.emitFile(f, content);
    var p = '__webpack_public_path__ + ' + JSON.stringify(f);
    return loaderCallback(null, 'module.exports = {srcSet:' + p + ',images:[{path:' + p + ',width:1}],src: ' + p + ',toString:function(){return ' + p + '}};');
  }

  var createFile = function createFile(_ref) {
    var data = _ref.data,
        width = _ref.width,
        height = _ref.height;

    var fileName = loaderUtils.interpolateName(loaderContext, name + ext, {
      context: outputContext,
      content: data
    }).replace(/\[width\]/ig, width);

    loaderContext.emitFile(fileName, data);

    return {
      src: '__webpack_public_path__ + ' + JSON.stringify(fileName + ' ' + width + 'w'),
      path: '__webpack_public_path__ + ' + JSON.stringify(fileName),
      width: width,
      height: height
    };
  };

  var createPlaceholder = function createPlaceholder(_ref2) {
    var data = _ref2.data;

    var placeholder = data.toString('base64');
    return JSON.stringify('data:' + (mime ? mime + ';' : '') + 'base64,' + placeholder);
  };

  var img = adapter(loaderContext.resourcePath);
  return img.metadata().then(function (metadata) {
    var promises = [];
    var widthsToGenerate = new Set();

    (Array.isArray(sizes) ? sizes : [sizes]).forEach(function (size) {
      var width = Math.min(metadata.width, parseInt(size, 10));

      // Only resize images if they aren't an exact copy of one already being resized...
      if (!widthsToGenerate.has(width)) {
        widthsToGenerate.add(width);
        promises.push(img.resize({
          width,
          quality,
          background,
          mime
        }));
      }
    });

    if (outputPlaceholder) {
      promises.push(img.resize({
        width: placeholderSize,
        quality,
        background,
        mime
      }));
    }

    return Promise.all(promises).then(function (results) {
      return outputPlaceholder ? {
        files: results.slice(0, -1).map(createFile),
        placeholder: createPlaceholder(results[results.length - 1])
      } : {
        files: results.map(createFile)
      };
    });
  }).then(function (_ref3) {
    var files = _ref3.files,
        placeholder = _ref3.placeholder;

    var srcset = files.map(function (f) {
      return f.src;
    }).join('+","+');

    var images = files.map(function (f) {
      return '{path:' + f.path + ',width:' + f.width + ',height:' + f.height + '}';
    }).join(',');

    var firstImage = files[0];

    loaderCallback(null, 'module.exports = {' + 'srcSet:' + srcset + ',' + 'images:[' + images + '],' + 'src:' + firstImage.path + ',' + 'toString:function(){return ' + firstImage.path + '},' + 'placeholder: ' + placeholder + ',' + 'width:' + firstImage.width + ',' + 'height:' + firstImage.height + '};');
  }).catch(function (err) {
    return loaderCallback(err);
  });
};

module.exports.raw = true; // get buffer stream instead of utf8 string