import { join } from 'path';

const root = process.cwd();
const src = join(root, 'src');
const build = join(root, 'build');
const client = join(src, 'client');
const server = join(src, 'server');
const sass = join(src, 'sass');
const images = join(src, 'images');
const universal = join(src, 'universal');
const content = join(src, 'content');
const database = join(src, 'database');
const atoms = join(universal, 'components/atoms');
const molecules = join(universal, 'components/molecules');
const organisms = join(universal, 'components/organisms');
const pages = join(universal, 'components/pages');
const templates = join(universal, 'components/templates');

const Paths = {
    root,
    atoms,
    build,
    client,
    content,
    database,
    images,
    molecules,
    organisms,
    pages,
    sass,
    src,
    templates,
    universal,
};

const Entries = {
    client: join(client, 'client.js'),
    routes: join(universal, 'routes/Routes.js'),
    staticRoutes: join(universal, 'routes/static.js'),
};

export { Entries };

export default Paths;
