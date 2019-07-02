var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    hot: true,
    port: 9000
  },
  entry: {
    plume: './docs/plume.min.js',
    main: './docs/main.min.js'
  }
};