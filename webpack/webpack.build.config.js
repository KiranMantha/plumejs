const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

baseConfig.plugins.push(new BundleAnalyzerPlugin({
    // Port that will be used by in `server` mode to start HTTP server. 
    analyzerPort: 4000
}));

module.exports = merge(baseConfig, {
    mode: 'production'
});