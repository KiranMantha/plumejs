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
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let config = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './example/index'
    },
    output: {
        path: path.resolve(__dirname, '../docs'),
        filename: `[name].[hash]${ MIN ? '.min' : '' }.js`,
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(s*)css$/,
            exclude: /node_modules/,
            use: [{
                    loader: "css-loader" // translates CSS into CommonJS
                },
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss']
    },
    plugins: [
        new WebpackPrebuild(() => {
            del([path.resolve(__dirname, '../docs')])
        }),
        new HtmlWebpack({
            filename: 'index.html',
            template: './example/index.html',
            inject: 'head'
        })
    ],
    optimization: {
        minimizer: [
            HOIST && new webpack.optimize.ModuleConcatenationPlugin(),
            MIN && new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
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