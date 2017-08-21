import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base from './webpack.config.base.js';
import nodeExternals from 'webpack-node-externals';
import Paths, { Entries } from './paths';

const serverInclude = [Paths.src];

export default merge(base, {
    entry: {
        routes: Entries.routes,
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: Paths.build,
        chunkFilename: '[name]_[chunkhash].js',
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: '/static/',
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __PRODUCTION__: true,
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    module: {
        loaders: [
            // Sass
            {
                test: /\.scss$/,
                include: Paths.src,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                root: Paths.src,
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
                    // publicPath: '../',
                }),
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: serverInclude,
            },
        ],
    },
});
