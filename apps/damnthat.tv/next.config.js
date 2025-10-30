module.exports = {
  outputFileTracingRoot: __dirname,
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
