const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config.base');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
};

module.exports = merge(config, {
    // devtool: 'cheap-module-source-map',
    entry: {
        client: [
            'babel-polyfill',
            'client',
        ],
        vendor: [
            'classnames',
            'debug',
            'fluxible',
            // 'fluxible-action-utils',
            'fluxible-addons-react',
            'react',
            'react-dom',
        ],
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.UglifyJsPlugin({
            // compress: {
            //     warnings: true,
            //     'screw_ie8': true,
            // },
            // output: {
            //     comments: false,
            // },
            sourceMap: false,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new ExtractTextPlugin({
            filename: 'css/styles.css',
            allChunks: true,
        }),
    ],
    module: {
        noParse: /\.min\.js$/,
        loaders: [
            // JavaScript / ES6
            {
                test: /\.(js|jsx|es6)?$/,
                include: [
                    path.resolve(__dirname, '../src/javascript'),
                ],
                loaders: [
                    'babel-loader',
                ],
            },
            // Sass
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, '../src/sass'),
                ],
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                    {
                        loader: 'css-loader',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            sourceMap: false,
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader', {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'compressed',
                        },
                    },
                    ],
                    publicPath: '../',
                }),
            },
            // CSS
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'postcss-loader'],
                }),
            },
        ],
    },
});
