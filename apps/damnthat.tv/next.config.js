const path = require('path');

module.exports = {
  transpilePackages: ['@workspace/ui'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.giphy.com',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },
};
