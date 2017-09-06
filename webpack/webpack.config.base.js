import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Paths from './paths';

const base = {
    context: Paths.src,
    resolve: {
        extensions: ['.js'],
        modules: [Paths.src, 'node_modules'],
        unsafeCache: true,
        alias: {
            Styles: Paths.sass,
            Atoms: Paths.atoms,
            Molecules: Paths.molecules,
            Organisms: Paths.organisms,
            Pages: Paths.pages,
            Templates: Paths.templates,
            Universal: Paths.universal,
        },
    },

    plugins: [new webpack.NoEmitOnErrorsPlugin()],

    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ],
    },
};

// Development Base Config
// Extended to the server and client configs

const devBase = merge(base, {
    // Production Sass loader
    plugins: [new ExtractTextPlugin('styles.css')],
    module: {
        loaders: [
            // Sass
            {
                test: /\.scss$/,
                include: Paths.sass,
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

// Production Base Config
// Extended to the server and client configs

const prodBase = merge(base, {
    // Production Sass loader
    plugins: [new ExtractTextPlugin('styles.css')],
    module: {
        loaders: [
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
        ],
    },
});

export default base;
export { prodBase, devBase };
