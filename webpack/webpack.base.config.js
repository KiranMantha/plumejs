const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const WebpackPrebuild = require('pre-build-webpack');
const del = require('del');
const HtmlWebpack = require('html-webpack-plugin');

let config = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './example/index'
    },
    output: {
        path: path.resolve(__dirname, '../docs'),
        publicPath: '/',
        filename: '[name].bundle.[hash].js',
        chunkFilename: '[name].chunk.[hash].js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
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
            },
            // {
            //     test: /\.(woff2?|ttf|eot|svg)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10000,
            //                 name: 'fonts/[name].[ext]'
            //             }
            //         }
            //     ]
            // }
        ]
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
                    output: {
                        comments: true
                    },
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            maxSize: 20000,
            minSize: 15000,
            automaticNameDelimiter: '-',
            cacheGroups: {
                // Split vendor code to its own chunk(s)
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    chunks: 'all'
                },
                //Split code common to all chunks to its own chunk
                commons: {
                    name: "commons", // The name of the chunk containing all common code
                    chunks: "all", // TODO: Document
                    minChunks: 2 // This is the number of modules
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        // The runtime should be in its own chunk
        runtimeChunk: {
            name: "runtime"
        }
    }
}

module.exports = config;