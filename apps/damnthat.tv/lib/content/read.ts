import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  contentImageDimensions,
  defaultContentRoot,
  resolveContentImageSrc,
} from './images';
import type {
  ContentPost,
  ContentRootOptions,
  HomepageDocument,
  ResumeAward,
  ResumeDocument,
  ResumeJob,
  ResumeLinkGroup,
  ResumeSchool,
  ResumeTechnologyList,
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
  company?: string;
  location?: string;
  links?: ResumeLinkGroup[];
  technologies?: {
    intro?: unknown;
    items?: unknown;
  };
  interests?: unknown;
  education?: unknown;
  awards?: unknown;
};

type JobFrontmatter = {
  company?: unknown;
  role?: unknown;
  logo?: unknown;
  logoAlt?: unknown;
  website?: unknown;
  start?: unknown;
  end?: unknown;
  present?: unknown;
  keywords?: unknown;
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

function asString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || undefined;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return undefined;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const text = asString(item);
    return text ? [text] : [];
  });
}

function readTechnologies(
  value: ResumeFrontmatter['technologies'],
): ResumeTechnologyList {
  if (!value || typeof value !== 'object') {
    return { items: [] };
  }

  return {
    intro: asString(value.intro),
    items: asStringList(value.items),
  };
}

function readSchools(value: unknown): ResumeSchool[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') {
      return [];
    }

    const school = entry as Record<string, unknown>;
    const institution = asString(school.institution);
    if (!institution) {
      return [];
    }

    return [
      {
        institution,
        copy: asString(school.copy),
        start: asString(school.start),
        end: asString(school.end),
      },
    ];
  });
}

function readAwards(value: unknown): ResumeAward[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') {
      return [];
    }

    const award = entry as Record<string, unknown>;
    const title = asString(award.title);
    if (!title) {
      return [];
    }

    return [
      {
        title,
        dates: asString(award.dates),
      },
    ];
  });
}

function readJob(
  filePath: string,
  resumeDirectory: string,
  root: string,
): ResumeJob {
  const source = readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter = data as JobFrontmatter;
  const company = asString(frontmatter.company);
  const role = asString(frontmatter.role);

  if (!company || !role) {
    throw new Error(`Resume job is missing company or role: ${filePath}`);
  }

  const logoPath = asString(frontmatter.logo);
  const logo = logoPath
    ? resolveContentImageSrc(root, resumeDirectory, logoPath)
    : undefined;
  const size = logo ? contentImageDimensions(logo, root) : null;

  return {
    company,
    role,
    logo,
    logoAlt: asString(frontmatter.logoAlt),
    logoWidth: logo ? (size?.width ?? 256) : undefined,
    logoHeight: logo ? (size?.height ?? 256) : undefined,
    website: asString(frontmatter.website),
    start: asString(frontmatter.start),
    end: asString(frontmatter.end),
    present: frontmatter.present === true,
    keywords: asStringList(frontmatter.keywords),
    body: content.trim(),
  };
}

function readJobs(resumeDirectory: string, root: string): ResumeJob[] {
  const jobsDirectory = path.join(resumeDirectory, 'jobs');
  if (!existsSync(jobsDirectory)) {
    return [];
  }

  return readdirSync(jobsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) =>
      readJob(path.join(jobsDirectory, entry.name), resumeDirectory, root),
    )
    .sort(
      (a, b) => publishedTime(b.start ?? '') - publishedTime(a.start ?? ''),
    );
}

export function getResume(options?: ContentRootOptions): ResumeDocument {
  const root = contentRoot(options);
  const filePath = path.join(root, 'resume', 'index.mdx');
  const source = readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter = data as ResumeFrontmatter;
  const directory = path.dirname(filePath);

  return {
    name: frontmatter.name ?? '',
    jobTitle: frontmatter.jobTitle ?? '',
    company: frontmatter.company ?? '',
    location: frontmatter.location ?? '',
    links: frontmatter.links ?? [],
    technologies: readTechnologies(frontmatter.technologies),
    interests: asStringList(frontmatter.interests),
    education: readSchools(frontmatter.education),
    awards: readAwards(frontmatter.awards),
    jobs: readJobs(directory, root),
    body: content.trim(),
    directory,
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
