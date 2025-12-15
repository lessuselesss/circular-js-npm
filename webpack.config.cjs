const path = require('path');
const webpack = require('webpack');

const path = require('path');
const webpack = require('webpack');

const browserConfig = {
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

const nodeConfig = {
  entry: './lib/index.js',
  target: 'node',
  output: {
    filename: 'index.cjs',
    path: path.resolve(__dirname, 'lib'),
    library: {
      type: 'commonjs',
    },
  },
  mode: 'production',
  externals: {
    'elliptic': 'elliptic',
    'node-fetch': 'node-fetch',
    'sha256': 'sha256',
    'crypto': 'crypto' // Native node crypto
  },
};

module.exports = [browserConfig, nodeConfig];
