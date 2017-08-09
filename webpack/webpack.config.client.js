import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import qs from 'querystring';
import base from './webpack.config.base.js';

import autoprefixer from 'autoprefixer';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const root = process.cwd();
const src = path.join(root, 'src');
const build = path.join(root, 'build');

const clientSrc = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');

const clientInclude = [clientSrc, universalSrc];

// Cache vendor && client javascript on CDN...
const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux'];

export default merge(base, {
    entry: {
        app: ['babel-polyfill/dist/polyfill.js', './client/client.js'],
        vendor,
    },
    output: {
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js',
        path: build,
        publicPath: '/static/',
    },
    resolve: {
        unsafeCache: true,
    },
    node: {
        dns: 'mock',
        net: 'mock',
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.NormalModuleReplacementPlugin(
            /\.\.\/routes\/static/,
            '../routes/async'
        ),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity,
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        /* minChunkSize should be 50000 for production apps */
        /* 10 is for this example */
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10 }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: { warnings: false },
            output: { comments: false },
        }),
        new AssetsPlugin({ path: build, filename: 'assets.json' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __PRODUCTION__: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
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

            // JavaScript
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: clientInclude,
            },

            // Sass
            {
                test: /\.scss$/,
                include: [src, 'sass'],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                root: src,
                                localIdentName: '[name]_[local]_[hash:base64:3]',
                                sourceMap: false,
                                importLoaders: 1,
                            },
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                outputStyle: 'compressed',
                            },
                        },
                    ],
                }),
            },
        ],
    },
});
