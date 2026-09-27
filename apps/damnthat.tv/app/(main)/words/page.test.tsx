import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { getPosts } from '../../../lib/content/read';
import { WordsIndex } from './page';

jest.mock('../../../lib/content/render', () => ({
  renderContentMdx: async (source: string) => source,
}));

const fixturesRoot = path.join(__dirname, '../../../lib/content/fixtures');
const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnv(value: string) {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
}

afterEach(() => {
  setNodeEnv(originalNodeEnv ?? 'test');
});

describe('given /words', () => {
  test('then the page uses the reader and production omits drafts', async () => {
    const pageSource = readFileSync(path.join(__dirname, 'page.tsx'), 'utf8');
    expect(pageSource).toContain('getPosts()');
    expect(pageSource).not.toMatch(/prismicio/);

    setNodeEnv('production');
    render(await WordsIndex({ posts: getPosts({ root: fixturesRoot }) }));

    const hrefs = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      '/words/newer-post',
      '/words/sample-post',
      '/words/older-post',
    ]);
    expect(
      screen.queryByRole('link', { name: /Draft Post/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Published after the fixture.'),
    ).toBeInTheDocument();
  });
});
