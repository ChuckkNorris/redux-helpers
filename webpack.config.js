const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'async-redux-helpers.bundle.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    library: 'async-redux-helpers',

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: [
        //   path.resolve(__dirname, "src")
        // ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
};