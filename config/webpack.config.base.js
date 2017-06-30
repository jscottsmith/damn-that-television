// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../build/client'),
        publicPath: '/',
    },
    resolve: {
        modules: [
            path.join(__dirname, '../src'),
            path.join(__dirname, '../src/javascript'),
            'node_modules',
        ],
        alias: {
            app: path.resolve(__dirname, '../src/javascript/'),
            actions: path.resolve(__dirname, '../src/javascript/actions'),
            components: path.resolve(__dirname, '../src/javascript/components'),
            atoms: path.resolve(
                __dirname,
                '../src/javascript/components/atoms'
            ),
            molecules: path.resolve(
                __dirname,
                '../src/javascript/components/molecules'
            ),
            organisms: path.resolve(
                __dirname,
                '../src/javascript/components/organisms'
            ),
            pages: path.resolve(
                __dirname,
                '../src/javascript/components/pages'
            ),
            templates: path.resolve(
                __dirname,
                '../src/javascript/components/templates'
            ),
            config: path.resolve(__dirname, '../src/javascript/config'),
            libs: path.resolve(__dirname, '../src/javascript/libs'),
            router: path.resolve(__dirname, '../src/javascript/router'),
            services: path.resolve(__dirname, '../src/javascript/services'),
            stores: path.resolve(__dirname, '../src/javascript/stores'),
            utils: path.resolve(__dirname, '../src/javascript/utils'),
            sass: path.resolve(__dirname, '../src/sass'),
            modernizr$: path.resolve(__dirname, '../.modernizrrc'),
            TweenLite: path.resolve(
                __dirname,
                '../node_modules/gsap/src/uncompressed/TweenLite'
            ),
        },
        extensions: ['.js', '.jsx', '.json', '.scss'],
    },
    resolveLoader: {
        alias: {
            responsive: path.join(
                __dirname,
                '../src/javascript/libs/responsive-loader/index.js'
            ),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch', // fetch API
        }),
        // Shared code
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.bundle.js',
        }),
        // static assets
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../src/assets'),
                to: 'assets',
            },
        ]),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../src/images'),
                to: 'images',
            },
        ]),
    ],
    module: {
        loaders: [
            // Modernizr
            {
                test: /\.modernizrrc$/,
                loader: 'modernizr-loader',
            },
            // Images
            // Inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.(png|jpg|jpeg|gif|svg|cur)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]',
                },
            },
            // Fonts
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    name: 'fonts/[name].[ext]?[hash]',
                },
            },
        ],
    },
    responsiveLoader: {
        adapter: require('../src/javascript/libs/responsive-loader/adapters/sharp.js'),
        sizes: [400, 800, 1200, 1920],
        quality: 80, // 0 - 100: Default 95
        placeholder: true,
        placeholderSize: 50,
    },
};
