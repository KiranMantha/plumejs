const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

baseConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = merge(baseConfig, {
    mode: 'production'
});