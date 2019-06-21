const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
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
    devtool: 'cheap-module-source-map',
    entry: {
        plume: './src/plume.ts',
        main: './example/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `[name]${ HOIST ? '-hoisted' : '' }.${ FORMAT }${ MIN ? '.min' : '' }.js`,
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
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            HOIST && new webpack.optimize.ModuleConcatenationPlugin(),
            MIN && new TerserPlugin(),
            new CompressionPlugin({
                algorithm: 'gzip'
            }),
        ].filter(Boolean)
    }
}

module.exports = config;