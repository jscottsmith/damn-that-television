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
        static: Entries.static,
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
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: { warnings: false },
            output: { comments: false },
        }),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new webpack.DefinePlugin({
            __CLIENT__: false,
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
