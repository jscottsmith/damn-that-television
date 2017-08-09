import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const root = process.cwd();
const src = path.join(root, 'src');
const universalSrc = path.join(src, 'universal');

export default {
    context: src,
    resolve: {
        extensions: ['.js'],
        modules: [src, 'node_modules'],
        unsafeCache: true,
        alias: {
            Styles: path.resolve(__dirname, path.join(src, 'sass')),
            Atoms: path.resolve(
                __dirname,
                path.join(universalSrc, 'components/atoms')
            ),
            Molecules: path.resolve(
                __dirname,
                path.join(universalSrc, 'components/molecules')
            ),
            Organisms: path.resolve(
                __dirname,
                path.join(universalSrc, 'components/organisms')
            ),
            Pages: path.resolve(
                __dirname,
                path.join(universalSrc, 'components/pages')
            ),
            Templates: path.resolve(
                __dirname,
                path.join(universalSrc, 'components/templates')
            ),
        },
    },
};
