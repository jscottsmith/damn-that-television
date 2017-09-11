import webpack from 'webpack';
import merge from 'webpack-merge';
import { prodBase } from './webpack.config.base.js';
import nodeExternals from 'webpack-node-externals';
import Paths, { Entries } from './paths';

const serverInclude = [Paths.src];

export default merge(prodBase, {
    entry: {
        routes: Entries.routes,
        static: Entries.staticRoutes,
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
                test: /\.js$/,
                loader: 'babel-loader',
                include: serverInclude,
            },
        ],
    },
});
