module.exports = {
  outputFileTracingRoot: __dirname,
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
