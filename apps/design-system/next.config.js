const path = require("path");

module.exports = {
  transpilePackages: ["@workspace/ui"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
};
