const path = require('path');

module.exports = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },
};
