const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {
    MIN,
    HOIST
} = process.env;
const WebpackPrebuild = require('pre-build-webpack');
const del = require('del');
const HtmlWebpack = require('html-webpack-plugin');

let config = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: path.resolve(__dirname,'example','index')
        //polyfill: 'babel-core/polyfill.js'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: `[name]${ MIN ? '.min' : '' }.js`,
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        new WebpackPrebuild(() => {
            del([path.resolve(__dirname, 'docs')])
        }),
        new HtmlWebpack({
            filename: 'index.html',
            template: path.resolve(__dirname, 'example', 'index.html'),
            inject: 'head'
        })
    ],
    optimization: {
        minimizer: [
            HOIST && new webpack.optimize.ModuleConcatenationPlugin(),
            MIN && new TerserPlugin({
                terserOptions: {
                    ecma: 5,
                    ie8: true,
                    keep_classnames:true,
                    keep_fnames: true
                }
            })
        ].filter(Boolean),
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        }
    }
}

module.exports = config;