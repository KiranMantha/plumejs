const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
    devServer: {
        contentBase: path.join(__dirname, "../docs"),
        compress: true,
        hot: true,
        port: 3002,
        open: true
    },
    watch: true
});
