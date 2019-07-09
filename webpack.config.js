const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {
    MIN,
    HOIST
} = process.env;
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackPrebuild = require('pre-build-webpack');
const PostCompile = require('post-compile-webpack-plugin')
const del = require('del');
const copy = require('copy');
const HtmlWebpack = require('html-webpack-plugin');

let config = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        plume: './src/plume.ts',
        main: './example/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            del([path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'docs')])
        }),
        new PostCompile(() => {            
            copy('dist/*.js', 'docs', function (err, file) {});
            copy('example/*.html', 'docs', function (err, file) {});            
        })
        // ,new HtmlWebpack({
        //     filename: 'index.html',
        //     inject: 'head',
        //     template: path.resolve(__dirname, 'example', 'index.html')
        // }),
    ],
    optimization: {
        minimizer: [
            HOIST && new webpack.optimize.ModuleConcatenationPlugin(),
            MIN && new TerserPlugin({
                terserOptions: {
                    keep_classnames:true,
                    keep_fnames: true
                }
            })
        ].filter(Boolean)
        // ,splitChunks: {
        //     chunks: 'all',
        //     name: 'vendor'
        // }
    }
}

module.exports = config;