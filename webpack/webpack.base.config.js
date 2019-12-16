const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const WebpackPrebuild = require('pre-build-webpack');
const del = require('del');
const HtmlWebpack = require('html-webpack-plugin');

let config = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './example/index'
    },
    output: {
        path: path.resolve(__dirname, '../docs'),
        publicPath: '/',
        filename: `[name].[hash].js`,
    },
    module: {
        rules: [{
            test: /.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: true
                }
            }]
        }, {
            test: /\.(s*)css$/,
            exclude: /node_modules/,
            use: ["css-loader", "sass-loader"]
        }, {
            test: /\.html$/,
            use: ["html-loader"]
        }]
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, '../example')
        },
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
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
}

module.exports = config;