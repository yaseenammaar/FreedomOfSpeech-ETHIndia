const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
}