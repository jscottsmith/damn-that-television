import { join } from 'path';

const root = process.cwd();
const src = join(root, 'src');
const build = join(root, 'build');
const client = join(src, 'client');
const server = join(src, 'server');
const sass = join(src, 'sass');
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
    src,
    build,
    client,
    sass,
    universal,
    content,
    database,
    atoms,
    molecules,
    organisms,
    pages,
    templates,
};

const Entries = {
    client: join(client, 'client.js'),
    routes: join(universal, 'routes/Routes.js'),
};

export { Entries };

export default Paths;
