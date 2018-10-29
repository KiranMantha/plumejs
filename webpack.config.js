const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const {
    FORMAT,
    MIN,
    HOIST
} = process.env;
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
    mode: 'production',
    entry: {
        plume: './plume.js',
        main: './example/index.js'
    },
    output: {
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, './dist/'),
        filename: `[name]${ HOIST ? '-hoisted' : '' }.${ FORMAT }${ MIN ? '.min' : '' }.js`,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    cacheDirectory: true,
                    presets: ['@babel/preset-env']
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        minimizer: [
            MIN && new UglifyJsPlugin(),
            HOIST && new webpack.optimize.ModuleConcatenationPlugin(),
            new CompressionPlugin({
                algorithm: 'gzip'
            }),
        ].filter(Boolean)
    },
    stats: {
        // Examine all modules
        maxModules: Infinity,
        // Display bailout reasons
        optimizationBailout: true
    }
}

module.exports = config;