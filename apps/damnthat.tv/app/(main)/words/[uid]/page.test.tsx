import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { getPost } from '../../../../lib/content/read';
import {
  PostArticle,
  buildPostMetadata,
  generateMetadata,
  postOrNotFound,
} from './page';
import type { ContentPost } from '../../../../lib/content/types';

jest.mock('../../../../lib/content/render', () => ({
  renderContentMdx: async (source: string) => source,
}));

const fixturesRoot = path.join(__dirname, '../../../../lib/content/fixtures');
const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnv(value: string) {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
}

afterEach(() => {
  setNodeEnv(originalNodeEnv ?? 'test');
});

function post(overrides: Partial<ContentPost> = {}): ContentPost {
  return {
    uid: 'sample',
    title: 'Post title',
    description: 'Post description',
    publishedOn: '2024-01-01T00:00:00Z',
    draft: false,
    tags: [],
    hero: '',
    heroAlt: '',
    thumb: '',
    metaTitle: '',
    metaDescription: '',
    metaImage: '',
    body: 'Post body',
    directory: fixturesRoot,
    ...overrides,
  };
}

describe('given /words/[uid]', () => {
  test('then generateMetadata reads frontmatter and falls back to the title', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ uid: 'archaic-horizon-net-label' }),
    });

    expect(metadata.title).toBe(
      'Archaic Horizon, an Experimental Electronic Netlabel',
    );
    expect(metadata.description).toContain('electronic music net label');
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: '/content-images/words/archaic-horizon-net-label/meta.jpg',
      }),
    ]);

    expect(
      buildPostMetadata(post({ metaTitle: '', title: 'Fallback title' })).title,
    ).toBe('Fallback title');
  });

  test('then a missing uid or a production draft calls notFound', () => {
    expect(() =>
      postOrNotFound(getPost('missing-post', { root: fixturesRoot })),
    ).toThrow();

    setNodeEnv('production');
    expect(() =>
      postOrNotFound(getPost('draft-post', { root: fixturesRoot })),
    ).toThrow();

    setNodeEnv('test');
    expect(
      postOrNotFound(getPost('draft-post', { root: fixturesRoot })).title,
    ).toBe('Draft Post');
  });

  test('then generateMetadata calls notFound for a missing uid', async () => {
    await expect(
      generateMetadata({ params: Promise.resolve({ uid: 'missing-post' }) }),
    ).rejects.toThrow();
  });

  test('then a published post renders its hero, title, tags, and body', async () => {
    const article = getPost('archaic-horizon-net-label');
    render(await PostArticle({ post: article! }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Archaic Horizon, an Experimental Electronic Netlabel',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('project')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Archaic Horizon logotype' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/In late 2006/)).toBeInTheDocument();
  });
});
