import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import qs from 'querystring';
import base from './webpack.config.base.js';

const root = process.cwd();
const src = path.join(root, 'src');

const clientSrc = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');

const clientInclude = [clientSrc, universalSrc];

const babelQuery = {
    presets: ['react', ['es2015', { modules: false }], 'stage-0'],
    plugins: ['transform-decorators-legacy', 'react-hot-loader/babel'],
};

export default merge(base, {
    devtool: 'eval',
    entry: {
        app: [
            'babel-polyfill/dist/polyfill.js',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?noInfo=false',
            './client/client.js',
        ],
    },
    output: {
        filename: 'app.js',
        chunkFilename: '[name]_[chunkhash].js',
        path: path.join(root, 'build'),
        publicPath: '/static/',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __PRODUCTION__: false,
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.(png|j|jpeg|gif|svg|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },

            // Javascript
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: babelQuery,
                include: clientInclude,
            },

            // Sass
            {
                test: /\.scss$/,
                include: [src, 'sass'],
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
        ],
    },
});
