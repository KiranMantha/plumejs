var path = require("path");
const appFolders = {
    src: path.resolve(__dirname, '../example'),
    entry: './example/index.ts',
    build: path.resolve(__dirname, '../docs'),
    tsconfig: path.resolve(__dirname, "../tsconfig.json"),
    index_html: './example/index.html'
}
const webpack = require('webpack');
const WebpackPrebuild = require('pre-build-webpack');
const del = require('del');
const HtmlWebpack = require('html-webpack-plugin');
const fromDir = require('./custom-scss-loader');
const scssObj = fromDir(appFolders.src, '.scss');
const { ReactLoadablePlugin } = require('./chunks.webpack.plugin');

let config = {
    devtool: 'cheap-module-source-map',
    entry: appFolders.entry,
    output: {
        path: appFolders.build,
        publicPath: '/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: appFolders.tsconfig
                    }
                }]
            }, {
                test: /\.html$/,
                use: ["html-loader"]
            }, {
                test: /\.(woff2?|ttf|eot|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new WebpackPrebuild(() => {
            del([appFolders.build])
        }),
        new HtmlWebpack({
            filename: 'index.html',
            template: appFolders.index_html,
            inject: 'head'
        }),
        new webpack.DefinePlugin({
          "process.env.COMPILEDCSSOBJ": JSON.stringify(scssObj)
        }),        
        new ReactLoadablePlugin({
            filename: 'manifest.json'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss']
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/i,
            chunks: 'all'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: "runtime"
      }
    }
}

module.exports = config;