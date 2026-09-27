import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { defaultContentRoot, resolveContentImageSrc } from './images';
import type {
  ContentPost,
  ContentRootOptions,
  HomepageDocument,
  ResumeDocument,
  ResumeLinkGroup,
} from './types';

type PostFrontmatter = {
  title?: string;
  description?: string;
  publishedOn?: string;
  draft?: boolean;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  thumb?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
};

type ResumeFrontmatter = {
  name?: string;
  jobTitle?: string;
  location?: string;
  links?: ResumeLinkGroup[];
};

function contentRoot(options?: ContentRootOptions): string {
  return options?.root ?? defaultContentRoot();
}

function includeDrafts(): boolean {
  return process.env.NODE_ENV !== 'production';
}

function publishedTime(value: string): number {
  const normalized = value.replace(/([+-]\d{2})(\d{2})$/, '$1:$2');
  const time = Date.parse(normalized);
  return Number.isNaN(time) ? 0 : time;
}

function readPost(filePath: string, root: string): ContentPost {
  const source = readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter = data as PostFrontmatter;
  const directory = path.dirname(filePath);
  const image = frontmatter.image ?? '';
  const thumb = frontmatter.thumb || image;

  return {
    uid: path.basename(directory),
    title: frontmatter.title ?? '',
    description: frontmatter.description ?? '',
    publishedOn: frontmatter.publishedOn ?? '',
    draft: frontmatter.draft === true,
    tags: frontmatter.tags ?? [],
    hero: resolveContentImageSrc(root, directory, image),
    heroAlt: frontmatter.imageAlt ?? '',
    thumb: resolveContentImageSrc(root, directory, thumb),
    metaTitle: frontmatter.metaTitle ?? '',
    metaDescription: frontmatter.metaDescription ?? '',
    metaImage: frontmatter.metaImage
      ? resolveContentImageSrc(root, directory, frontmatter.metaImage)
      : '',
    body: content.trim(),
    directory,
  };
}

function readPosts(options?: ContentRootOptions): ContentPost[] {
  const root = contentRoot(options);
  const wordsDirectory = path.join(root, 'words');

  if (!existsSync(wordsDirectory)) {
    return [];
  }

  return readdirSync(wordsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(wordsDirectory, entry.name, 'index.mdx'))
    .filter((filePath) => existsSync(filePath))
    .map((filePath) => readPost(filePath, root));
}

export function getHomepage(options?: ContentRootOptions): HomepageDocument {
  const filePath = path.join(contentRoot(options), 'homepage.md');
  const source = readFileSync(filePath, 'utf8');
  const { content } = matter(source);

  return { body: content.trim() };
}

export function getResume(options?: ContentRootOptions): ResumeDocument {
  const filePath = path.join(contentRoot(options), 'resume', 'index.mdx');
  const source = readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter = data as ResumeFrontmatter;

  return {
    name: frontmatter.name ?? '',
    jobTitle: frontmatter.jobTitle ?? '',
    location: frontmatter.location ?? '',
    links: frontmatter.links ?? [],
    body: content.trim(),
    directory: path.dirname(filePath),
  };
}

export function getPosts(options?: ContentRootOptions): ContentPost[] {
  return readPosts(options)
    .filter((post) => includeDrafts() || !post.draft)
    .sort(
      (a, b) => publishedTime(b.publishedOn) - publishedTime(a.publishedOn),
    );
}

export function getPost(
  uid: string,
  options?: ContentRootOptions,
): ContentPost | null {
  const post = readPosts(options).find((entry) => entry.uid === uid) ?? null;

  if (!post) {
    return null;
  }

  if (post.draft && !includeDrafts()) {
    return null;
  }

  return post;
}
