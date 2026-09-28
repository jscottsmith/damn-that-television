import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { getHomepage } from '../../lib/content/read';
import { Introduction } from './home/components/introduction';

jest.mock('../../lib/content/render', () => ({
  renderContentMdx: async (source: string) => source,
}));

const homepageFiles = [
  'page.tsx',
  'home/index.tsx',
  'home/components/introduction/index.tsx',
];

const removedClient = ['pris', 'micio'].join('');

describe('given the homepage', () => {
  test('then it passes the repository introduction through', async () => {
    for (const file of homepageFiles) {
      const source = readFileSync(path.join(__dirname, file), 'utf8');
      expect(source).not.toContain(removedClient);
    }

    const pageSource = readFileSync(path.join(__dirname, 'page.tsx'), 'utf8');
    expect(pageSource).toContain('getHomepage()');
    expect(pageSource).toContain('introduction={homepage.body}');

    const homepage = getHomepage();
    render(await Introduction({ source: homepage.body }));

    expect(screen.getByRole('article').textContent).toContain(
      "Hi there, I'm J",
    );
    expect(screen.getByRole('article').textContent).toContain('résumé');
  });
});
