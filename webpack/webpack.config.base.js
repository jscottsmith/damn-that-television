import webpack from 'webpack';
import Paths from './paths';

export default {
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
            Database: Paths.database,
        },
    },
};
