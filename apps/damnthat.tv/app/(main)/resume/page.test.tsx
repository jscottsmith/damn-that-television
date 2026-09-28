import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createElement, type ComponentType } from 'react';
import * as jsxRuntime from 'react/jsx-dev-runtime';
import { fireEvent, render, screen } from '@testing-library/react';
import { defaultContentRoot } from '../../../lib/content/images';
import { getResume } from '../../../lib/content/read';
import { Resume } from './Resume';
import { createResumeMdxComponents } from './mdx';

const appRoot = path.join(__dirname, '../../..');
const resumeDirectory = path.join(defaultContentRoot(), 'resume');

const fixture = `
<ResumeContent title="Who" large>

Senior engineer with frontend expertise.

</ResumeContent>

<WorkTogether title="Interested in working together?" note="* Please don't send copypasta job descriptions." declined="No worries, carry on.">

### That's Nice to hear!

I'm always open to hear about new opportunities.

</WorkTogether>

<WorkHistory title="Experience">

<Job company="Point One Navigation" role="Staff Software Engineer" logo="./logos/point-one-navigation.png" logoAlt="Point One Navigation" start="2025-11-02" present keywords={["GNSS"]}>

Precision location for the real world.

</Job>

<Job company="Nike Virtual Studios" role="Engineering Manager" logo="./logos/nike-virtual-studios.jpg" logoAlt="dotSwoosh Logo" website="https://swoosh.nike" start="2024-04-01" end="2025-11-15" keywords={["Leadership"]}>

Led a small but mighty frontend engineering team.

</Job>

<Job company="Nike Virtual Studios" role="Senior Full Stack Engineer" website="https://swoosh.nike" start="2022-08-15" end="2024-03-30">

Launched a new Nike brand.

</Job>

</WorkHistory>

<WorkHistoryCondensed title="Earlier Experience">

<CondensedJob company="Big Storm Studio" role="Designer and Web Developer" start="2012-11-01" end="2015-06-01" />

</WorkHistoryCondensed>

<ResumeList title="Technologies">

A non-exhaustive list of technologies.

<Item>TypeScript</Item>

</ResumeList>

<Education title="Education">

<School institution="Memorisely" copy="Product Design UI/UX Bootcamp" start="2022-05-01" />

<School institution="California State University, Long Beach" copy="BFA Graphic Design" start="2008-01-01" end="2012-01-01" />

</Education>

<Awards title="Awards & Honors">

<Award title="Magna Cum Laude" dates="2012" />

</Awards>
`;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return sourceFiles(fullPath);
    }

    return /\.(tsx|ts)$/.test(entry.name) ? [fullPath] : [];
  });
}

function compiledMdx(source: string): string {
  const script = `
    import { serialize } from 'next-mdx-remote/serialize';
    const result = await serialize(${JSON.stringify(source)}, {
      parseFrontmatter: false,
      blockJS: false,
    }, true);
    process.stdout.write(result.compiledSource);
  `;

  return execFileSync(process.execPath, ['--input-type=module', '-e', script], {
    cwd: appRoot,
    encoding: 'utf8',
  });
}

function renderCompiledMdx(compiledSource: string) {
  const scope = {
    opts: jsxRuntime,
    frontmatter: {},
  };
  const hydrate = Reflect.construct(Function, [
    ...Object.keys(scope),
    compiledSource,
  ]) as (...args: unknown[]) => {
    default: ComponentType<{ components: unknown }>;
  };
  const Content = hydrate(...Object.values(scope)).default;

  return createElement(Content, {
    components: createResumeMdxComponents({
      contentRoot: defaultContentRoot(),
      directory: resumeDirectory,
    }),
  });
}

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const removedClient = ['pris', 'micio'].join('');

describe('given the résumé route', () => {
  test('then it reads repository content', () => {
    for (const file of sourceFiles(__dirname)) {
      if (file.endsWith('page.test.tsx')) {
        continue;
      }

      const source = readFileSync(file, 'utf8');
      expect(source).not.toContain(removedClient);
    }

    const pageSource = readFileSync(path.join(__dirname, 'page.tsx'), 'utf8');
    expect(pageSource).toContain('getResume()');
    expect(pageSource).toContain('name={resume.name}');
    expect(pageSource).toContain('jobTitle={resume.jobTitle}');
    expect(pageSource).toContain('location={resume.location}');
    expect(pageSource).toContain('links={resume.links}');
    expect(pageSource).toContain('createResumeMdxComponents');
  });

  test('then the header comes from résumé frontmatter', () => {
    const resume = getResume();

    render(
      <Resume
        name={resume.name}
        jobTitle={resume.jobTitle}
        location={resume.location}
        links={resume.links}
      >
        <p>Body marker</p>
      </Resume>,
    );

    expect(screen.getByText('J Scott Smith')).toBeInTheDocument();
    expect(screen.getByText('Engineering Manager')).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Connect' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'jscsmith@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:jscsmith@gmail.com');
    expect(screen.getByText('Body marker')).toBeInTheDocument();
  });

  test('then each body section receives the fields it renders', async () => {
    render(renderCompiledMdx(compiledMdx(fixture)));

    expect(screen.getByText('Who')).toBeInTheDocument();
    expect(
      screen.getByText('Senior engineer with frontend expertise.').closest(
        '[data-slot="prose"]',
      )?.className,
    ).toContain('prose-xl');

    expect(await screen.findByText('Interested in working together?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Yep/ }));
    expect(screen.getByText("That's Nice to hear!")).toBeInTheDocument();
    expect(screen.getByText(/copypasta job descriptions/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /No Thanks/ }));
    expect(screen.getByText('No worries, carry on.')).toBeInTheDocument();

    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getAllByText('Nike Virtual Studios')).toHaveLength(1);
    expect(screen.getByText('Staff Software Engineer')).toBeInTheDocument();
    expect(
      screen.getByText('Precision location for the real world.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Present')).toBeInTheDocument();
    expect(screen.getByText('GNSS')).toBeInTheDocument();
    expect(screen.getAllByText(/November 2025/).length).toBeGreaterThan(0);
    expect(screen.getByText('Engineering Manager')).toBeInTheDocument();
    expect(screen.getByText(/April 2024/)).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Senior Full Stack Engineer')).toBeInTheDocument();
    expect(
      screen.getByText('Launched a new Nike brand.'),
    ).toBeInTheDocument();
    expect(
      document.querySelectorAll('[data-website="https://swoosh.nike"]'),
    ).toHaveLength(3);

    const logo = screen.getByRole('img', { name: 'Point One Navigation' });
    expect(decodeURIComponent(logo.getAttribute('src') ?? '')).toContain(
      'point-one-navigation.png',
    );
    expect(
      decodeURIComponent(
        screen.getByRole('img', { name: 'dotSwoosh Logo' }).getAttribute('src') ??
          '',
      ),
    ).toContain('nike-virtual-studios.jpg');

    expect(screen.getByText('Earlier Experience')).toBeInTheDocument();
    expect(screen.getByText('Big Storm Studio')).toBeInTheDocument();
    expect(screen.getByText('Designer and Web Developer')).toBeInTheDocument();
    expect(screen.getAllByText(/2012/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/2015/).length).toBeGreaterThan(0);

    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(
      screen.getByText(/non-exhaustive list of technologies/),
    ).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Memorisely')).toBeInTheDocument();
    expect(screen.getByText('Product Design UI/UX Bootcamp')).toBeInTheDocument();
    expect(screen.getAllByText(/2022/).length).toBeGreaterThan(0);
    expect(
      screen.getByText('California State University, Long Beach'),
    ).toBeInTheDocument();
    expect(screen.getByText('BFA Graphic Design')).toBeInTheDocument();
    expect(screen.getAllByText(/2008/).length).toBeGreaterThan(0);

    expect(screen.getByText('Awards & Honors')).toBeInTheDocument();
    expect(screen.getByText('Magna Cum Laude')).toBeInTheDocument();
  });
});
