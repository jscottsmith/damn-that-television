import webpack from 'webpack';
import merge from 'webpack-merge';
import { devBase } from './webpack.config.base.js';
import AssetsPlugin from 'assets-webpack-plugin';
import Paths, { Entries } from './paths';

const devInclude = [Paths.client, Paths.universal];

// Cache vendor && client javascript on CDN...
const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux'];

// Custom babel qquery for HMR
const babelQuery = {
    presets: ['react', ['es2015', { modules: false }], 'stage-0'],
    plugins: ['transform-decorators-legacy', 'react-hot-loader/babel'],
};

export default merge(devBase, {
    devtool: 'eval',
    entry: {
        app: [
            'babel-polyfill/dist/polyfill.js',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?noInfo=false',
            Entries.client,
        ],
        vendor,
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name]_[chunkhash].js',
        path: Paths.build,
        publicPath: '/static/',
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new AssetsPlugin({ path: Paths.build, filename: 'assets.json' }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __PRODUCTION__: false,
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    module: {
        loaders: [
            // Javascript
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: babelQuery,
                include: devInclude,
            },
        ],
    },
});
