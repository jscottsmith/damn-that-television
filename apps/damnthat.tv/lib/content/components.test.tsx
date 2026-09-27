import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { createElement, type ComponentType } from 'react';
import * as jsxRuntime from 'react/jsx-dev-runtime';
import { render, screen } from '@testing-library/react';
import { createContentMdxComponents } from './components';

jest.mock('@/components/code-block', () => ({
  CodeBlock: ({ children, lang }: { children: string; lang: string }) => (
    <pre data-lang={lang}>{children}</pre>
  ),
}));

const componentDirectory = path.join(__dirname, 'components');
const fixtureDirectory = path.join(__dirname, 'fixtures', 'components');
const fixturesRoot = path.join(__dirname, 'fixtures');
const appRoot = path.join(__dirname, '../..');

function compiledMdx(source: string): string {
  // Jest cannot load the ESM MDX compiler. Node compiles the same source
  // `compileMDX` uses, and the test hydrates that output with the MDX components.
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
    components: createContentMdxComponents({
      contentRoot: fixturesRoot,
      directory: fixtureDirectory,
    }),
  });
}

describe('given a fixture MDX body', () => {
  test('then it renders gallery, code block, and embed without Prismic types', () => {
    const sources = readdirSync(componentDirectory).filter((file) =>
      file.endsWith('.tsx'),
    );

    for (const file of sources) {
      const source = readFileSync(path.join(componentDirectory, file), 'utf8');
      expect(source).not.toMatch(/@prismicio|prismicio-types/);
    }

    const body = readFileSync(path.join(fixtureDirectory, 'body.mdx'), 'utf8');
    render(renderCompiledMdx(compiledMdx(body)));

    expect(screen.getByText('Gallery caption')).toBeInTheDocument();
    expect(
      decodeURIComponent(
        screen.getByRole('img', { name: 'One' }).getAttribute('src') ?? '',
      ),
    ).toContain('/content-images/components/one.jpg');
    expect(screen.getByText('const answer = 42')).toBeInTheDocument();
    expect(screen.getByText('Embed markup')).toBeInTheDocument();
  });
});
