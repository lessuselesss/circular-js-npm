const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'circular-api-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'CircularProtocolAPI',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "vm": require.resolve("vm-browserify"),
      "process": require.resolve("process/browser"),
    },
    alias: {
      'node-fetch': path.resolve(__dirname, 'lib/browser-fetch.js'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
};
