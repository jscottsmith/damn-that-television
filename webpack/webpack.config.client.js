import webpack from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.config.base.js';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Paths, { Entries } from './paths';

const clientInclude = [Paths.client, Paths.universal];

// Cache vendor && client javascript on CDN...
const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux'];

export default merge(base, {
    entry: {
        app: ['babel-polyfill/dist/polyfill.js', Entries.client],
        vendor,
    },
    output: {
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js',
        path: Paths.build,
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
        new AssetsPlugin({ path: Paths.build, filename: 'assets.json' }),
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
                exclude: [Paths.database, Paths.content, /node_modules/],
            },

            // Sass
            {
                test: /\.scss$/,
                include: Paths.sass,
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
                }),
            },
        ],
    },
});
