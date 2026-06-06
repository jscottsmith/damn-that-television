const path = require('path');

module.exports = {
  transpilePackages: ['@workspace/ui'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
};
