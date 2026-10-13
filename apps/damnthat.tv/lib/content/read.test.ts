import path from 'node:path';
import { getHomepage, getPost, getPosts, getResume } from './read';

const fixturesRoot = path.join(__dirname, 'fixtures');
const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnv(value: string) {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
}

afterEach(() => {
  setNodeEnv(originalNodeEnv ?? 'test');
});

describe('given a fixture post', () => {
  test('then the reader returns its title, hero path, and body', () => {
    const post = getPost('sample-post', { root: fixturesRoot });

    expect(post).toMatchObject({
      title: 'Fixture Title',
      hero: '/content-images/words/sample-post/hero.jpg',
    });
    expect(post?.body).toContain('Fixture body paragraph');
  });
});

describe('given repository content', () => {
  test('then the reader loads the homepage markdown and résumé MDX', () => {
    const homepage = getHomepage();
    const resume = getResume();

    expect(homepage.body).toContain("Hi there, I'm J");
    expect(resume.name).toBe('J Scott Smith');
    expect(resume.jobTitle).toBe('Staff Software Engineer');
    expect(resume.company).toBe('Point One Navigation');
    expect(resume.body).toContain('<ResumeContent');
    expect(resume.body).not.toContain('<WorkHistory');
    expect(resume.jobs.map((job) => `${job.company} ${job.role}`)).toEqual([
      'Point One Navigation Staff Software Engineer',
      'Nike Virtual Studios Engineering Manager',
      'Nike Virtual Studios Senior Full Stack Engineer',
      'HMBradley Senior Software Engineer',
      'Fair Senior Software Engineer',
      'GumGum Senior Web Engineer',
      'HAUS Lead Frontend Developer',
      'Big Storm Studio Designer and Web Developer',
      'CSU Chancellor’s Office Graphic Designer',
      'California State University Summer Arts Graphic Designer',
      'Visual Purple 3D Artist and Animator',
    ]);
    expect(resume.jobs[0]?.present).toBe(true);
    expect(resume.jobs[0]?.logo).toContain('point-one-navigation.png');
    expect(resume.jobs[0]?.body).toContain('centimeter-level positioning');
    expect(resume.jobs[1]?.keywords).toContain('Leadership');
    expect(resume.technologies.intro).toContain(
      'non-exhaustive list of technologies',
    );
    expect(resume.technologies.items).toContain('TypeScript');
    expect(resume.interests).toContain('Leadership');
    expect(resume.education[0]).toMatchObject({
      institution: 'Memorisely',
      copy: 'Product Design UI/UX Bootcamp',
      start: '2022-05-01',
    });
    expect(resume.awards.map((award) => award.title)).toContain(
      'Magna Cum Laude',
    );
  });
});

describe('given draft filtering and ordering', () => {
  const options = { root: fixturesRoot };

  test('then production omits draft posts', () => {
    setNodeEnv('production');

    const titles = getPosts(options).map((post) => post.title);

    expect(titles).not.toContain('Draft Post');
    expect(getPost('draft-post', options)).toBeNull();
  });

  test('then other environments include drafts', () => {
    setNodeEnv('test');

    const titles = getPosts(options).map((post) => post.title);

    expect(titles).toContain('Draft Post');
    expect(getPost('draft-post', options)?.title).toBe('Draft Post');
  });

  test('then posts are ordered by publishedOn descending', () => {
    setNodeEnv('test');

    const titles = getPosts(options).map((post) => post.title);

    expect(titles).toEqual([
      'Draft Post',
      'Newer Post',
      'Fixture Title',
      'Older Post',
    ]);
  });

  test('then an unknown uid is a missing result', () => {
    expect(getPost('missing-post', options)).toBeNull();
  });
});
