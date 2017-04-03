const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config.base');
const path = require('path');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
};

module.exports = merge(config, {
    cache: true,
    devtool: 'inline-source-map',
    entry: {
        client: [
            'babel-polyfill',
            'client',
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
        ],
        vendor: [
            'classnames',
            'debug',
            'fluxible',
            'fluxible-addons-react',
            'react',
            'react-dom',
        ],
    },
    externals: {
        'TweenLite': 'TweenLite',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(GLOBALS),
    ],
    module: {
        loaders: [
            // JavaScript / ES6
            {
                test: /\.(js|jsx|es6)?$/,
                include: [
                    path.resolve(__dirname, '../src/javascript'),
                ],
                loaders: [
                    'react-hot-loader',
                    'babel-loader',
                ],
            },
            // Sass
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, '../src/sass'),
                ],
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                        },
                    },
                ],
            },
            // CSS
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
            },
        ],
    },
});
