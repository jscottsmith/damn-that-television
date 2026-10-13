import { compileMDX, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { createContentMdxComponents } from './components';

type MdxComponents = NonNullable<MDXRemoteProps['components']>;

export async function renderContentMdx(
  source: string,
  input: {
    contentRoot: string;
    directory: string;
    prose?: boolean;
    components?: MdxComponents;
  },
) {
  const { content } = await compileMDX({
    source,
    components: {
      ...createContentMdxComponents(input),
      ...input.components,
    },
    options: {
      // Posts use JSX expressions such as `columns={2}`. The résumé narrative uses MDX components.
      parseFrontmatter: false,
      blockJS: false,
    },
  });

  return content;
}
